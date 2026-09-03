export const insightsIntro = {
  label: 'Journal',
  headline: 'Insights & stories.',
  body: 'No jargon. Practical notes from the studio floor — written for the founders and marketers we work with, not for other agencies.',
  aside: 'Think of it as a working notebook we have made public. Clear, honest, and useful.',
};

/**
 * `readTime` and `date` are shown on the card; `id` keys the image in
 * data/media.js. Posts link nowhere yet — wire `href` when the journal
 * itself exists rather than shipping cards that dead-end.
 */
export const insights = [
  {
    id: 'shot-day',
    date: '12 Aug 2026',
    dateISO: '2026-08-12',
    category: 'Production',
    title: 'How many SKUs can you really shoot in a day?',
    excerpt:
      'The honest answer is a range, and it depends far more on styling than on the camera. Here is how we scope a shoot day.',
    author: 'Aarav Mehta',
    role: 'Studio Director',
    readTime: '5 min',
  },
  {
    id: 'retouching',
    date: '29 Jul 2026',
    dateISO: '2026-07-29',
    category: 'Post-production',
    title: 'Retouching: how much is too much?',
    excerpt:
      'Retouch until the product looks like itself on its best day — and stop. What we clean up, and what we deliberately leave alone.',
    author: 'Ishita Rao',
    role: 'Lead Retoucher',
    readTime: '4 min',
  },
  {
    id: 'lighting',
    date: '15 Jul 2026',
    dateISO: '2026-07-15',
    category: 'Craft',
    title: 'One light is usually enough',
    excerpt:
      'Most product shots that look expensive were lit with a single source and a lot of patience. A walk through three setups.',
    author: 'Jai Chachra',
    role: 'Client Success Manager',
    readTime: '6 min',
  },
];
