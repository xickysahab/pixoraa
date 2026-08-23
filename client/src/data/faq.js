import { site } from './site';

export const faqIntro = {
  label: 'Questions',
  headline: 'FAQ.',
  body: 'Answers to the things people usually ask — and room to ask your own.',
  ctaLabel: 'Ask a question',
  ctaHref: `mailto:${site.email}?subject=Question%20for%20Pixoraa`,
};

/**
 * Answers are specific on purpose. A FAQ that says "it depends" for
 * every question is worse than no FAQ — the whole value is committing to
 * a number the reader can plan around.
 *
 * Timings and formats here are placeholders; replace with Pixoraa's real
 * policy before launch.
 */
export const faqs = [
  {
    id: 'shoot-length',
    q: 'How long does a typical product photography shoot take?',
    a: 'For a standard 20–30 SKU shoot we finish in a single day, usually 8–10 hours on the floor. Larger collections or styled lifestyle setups run to two days. You get a shot list and a schedule before the day, so nothing is decided on the fly.',
  },
  {
    id: 'outside-delhi',
    q: 'Do you work outside Delhi?',
    a: 'Yes. The studio is in Delhi, and we travel for location work across India — travel and stay are quoted separately and agreed up front. For brands outside the city we also handle courier-in, shoot, and courier-back of product.',
  },
  {
    id: 'delivery',
    q: 'How are final images delivered, and in what formats?',
    a: 'Retouched images arrive as high-resolution JPEGs and web-optimised versions, via a private gallery link. TIFFs or PSDs are available on request. Marketplace-ready crops — Amazon, Flipkart, Shopify — are included when you need them.',
  },
  {
    id: 'post-production',
    q: 'Can you handle both the photography and the post-production?',
    a: 'That is the default. Direction, lighting, styling, and retouching all happen in house with the same team, so nothing is handed to a third party and quality does not drift between stages.',
  },
  {
    id: 'pricing',
    q: 'What is your pricing structure?',
    a: 'Project-based, not hourly. Product shoots are priced per SKU with a day-rate floor; campaigns and retainers are quoted after the discovery call. You get a fixed number in writing before anything starts — no hourly meters, no surprise line items.',
  },
  {
    id: 'early-stage',
    q: 'Do you work with early-stage brands, or only established ones?',
    a: 'Both. A good deal of our work is first-shoot D2C brands getting their catalogue right before launch. Smaller scope, same crew — we do not staff junior teams onto smaller budgets.',
  },
];
