// Global site facts — name, nav, contact, socials.
export const site = {
  name: 'Pixoraa Digital',
  mark: 'Pixoraa Digital©',
  locations: ['Dubai', 'London', 'India'],
  base: 'Delhi, India',
  email: 'hello@pixoraa.com',
  since: 2016,
};

/**
 * Every entry points at a section id that actually exists on the page.
 * `Team` used to sit here pointing at `#team`, which was never built —
 * clicking it silently did nothing. A nav item that goes nowhere is
 * worse than a missing one, so it comes back when the section does.
 */
export const navLinks = [
  { id: 'clients', label: 'Clients', href: '#clients' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'work', label: 'Work', href: '#work' },
  { id: 'gallery', label: 'Studio', href: '#gallery' },
  { id: 'process', label: 'Process', href: '#process' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const socials = [
  { id: 'instagram', label: 'Instagram', href: 'https://instagram.com' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com' },
  { id: 'x', label: 'X', href: 'https://x.com' },
];

export const hero = {
  eyebrow: 'Creative & Digital Studio',
  // Small statement, top-left — the headline itself is the studio name
  // of what we are, set huge on the right.
  statement: "Unlock your brand's potential with expert design, content & strategy.",
  headline: ['Creative', 'Digital', 'Studio'],
  primaryCta: { label: 'Start a project', href: '#contact' },
  secondaryCta: { label: 'See our work', href: '#work' },
  rating: { score: '4.9', outOf: '5', clients: '100+' },
  stats: [
    { id: 'clients', value: 100, suffix: '+', caption: 'Happy clients worldwide' },
    { id: 'retention', value: 95, suffix: '%', caption: 'Client retention rate' },
  ],
  growthCard: {
    title: 'Your partner in brand growth',
    copy: 'Senior creatives who work as an extension of your team — no pitches, no project-management theatre.',
    cta: { label: 'How we work', href: '#process' },
    footer: 'Building brands since 2016',
  },
  // The giant clipped type at the hero's bottom edge.
  wordmark: 'Pixoraa',
};
