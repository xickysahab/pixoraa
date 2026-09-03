import { site } from './site';

export const contactIntro = {
  label: 'Contact',
  headline: 'Let us make something worth looking at.',
  body: 'Photography, video, web, or marketing support — tell us what you need and we will come back within one working day.',
};

/** Mirrors the six capabilities in data/services.js. */
export const serviceOptions = [
  'Photography & Videography',
  'Studio on Rent',
  'Creative Content',
  'Graphic Design',
  'Influencer Marketing',
  'Web Development',
  'Something else',
];


/** The three facts a prospect looks for before filling anything in. */
export const contactChannels = [
  { id: 'phone', label: 'Call', value: site.phone, href: `tel:${site.phone.replace(/\s/g, '')}` },
  { id: 'email', label: 'Email', value: site.email, href: `mailto:${site.email}` },
  { id: 'studio', label: 'Studio', value: site.address, href: site.mapHref },
];
