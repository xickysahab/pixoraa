import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import contactRoute from './routes/contact.js';
import newsletterRoute from './routes/newsletter.js';
import rateLimit from './middleware/rate_limit.js';
import errorHandler from './middleware/error_handler.js';

const app = express();
const PORT = process.env.PORT || 5050;

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN?.split(',') || 'http://localhost:5173',
  })
);
app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'pixoraa-api' });
});

app.use('/api/contact', rateLimit({ windowMs: 60_000, max: 5 }), contactRoute);
app.use('/api/newsletter', rateLimit({ windowMs: 60_000, max: 5 }), newsletterRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[pixoraa-api] listening on http://localhost:${PORT}`);
});
