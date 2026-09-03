const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates and accepts a project enquiry.
 * Delivery (SMTP / CRM) is deliberately left as one clearly marked
 * hook rather than a half-wired integration.
 */
export async function submitContact(req, res, next) {
  try {
    const { name, email, company, service, message, website } = req.body ?? {};

    // Honeypot: bots fill hidden fields, humans never see them.
    if (website) {
      return res.json({ ok: true, message: 'Thanks — we\'ll be in touch.' });
    }

    const errors = {};
    if (!name?.trim() || name.trim().length < 2) errors.name = 'Please enter your name.';
    if (!EMAIL_RE.test(email ?? '')) errors.email = 'Please enter a valid email.';
    if (!message?.trim() || message.trim().length < 10) {
      errors.message = 'Tell us a little more about the project.';
    }

    if (Object.keys(errors).length) {
      return res.status(400).json({ ok: false, errors });
    }

    const enquiry = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: company?.trim() || null,
      service: service || null,
      message: message.trim(),
      receivedAt: new Date().toISOString(),
    };

    // TODO(delivery): send via SES/Resend/Nodemailer, or push to a CRM.
    console.log('[pixoraa-api] new enquiry:', enquiry);

    res.json({
      ok: true,
      message: 'Thanks — we\'ll come back to you within one working day.',
    });
  } catch (err) {
    next(err);
  }
}
