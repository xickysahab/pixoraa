/** Last-resort handler. Never leaks a stack trace to the client. */
export default function errorHandler(err, _req, res, _next) {
  console.error('[pixoraa-api]', err);

  res.status(err.status || 500).json({
    ok: false,
    error: err.expose ? err.message : 'Something went wrong. Please try again.',
  });
}
