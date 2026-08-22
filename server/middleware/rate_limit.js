/**
 * Minimal in-memory rate limiter — enough for a single-instance
 * contact form. Swap for a Redis-backed limiter if this ever runs
 * on more than one dyno.
 */
export default function rateLimit({ windowMs = 60_000, max = 5 } = {}) {
  const hits = new Map();

  // Drop expired buckets so the map can't grow without bound.
  setInterval(() => {
    const now = Date.now();
    for (const [key, bucket] of hits) {
      if (now > bucket.resetAt) hits.delete(key);
    }
  }, windowMs).unref();

  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();
    const bucket = hits.get(key);

    if (!bucket || now > bucket.resetAt) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    if (bucket.count >= max) {
      return res.status(429).json({
        ok: false,
        error: 'Too many requests. Please try again in a minute.',
      });
    }

    bucket.count += 1;
    next();
  };
}
