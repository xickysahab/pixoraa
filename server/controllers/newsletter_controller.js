const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribe(req, res, next) {
  try {
    const { email } = req.body ?? {};

    if (!EMAIL_RE.test(email ?? '')) {
      return res
        .status(400)
        .json({ ok: false, errors: { email: 'Please enter a valid email.' } });
    }

    // TODO(delivery): push to the mailing-list provider.
    console.log('[pixoraa-api] subscribe:', email.trim().toLowerCase());

    res.json({ ok: true, message: 'You\'re on the list.' });
  } catch (err) {
    next(err);
  }
}
