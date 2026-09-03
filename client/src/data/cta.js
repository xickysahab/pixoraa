import { galleryVideos, galleryImages } from './media';

/**
 * The two mid-page conversion breaks. Same component, different copy —
 * one asks for a project, one sells the studio as a standalone product.
 */
export const ctaProject = {
  id: 'cta-project',
  label: 'Ready when you are',
  headline: 'Your brand deserves the best.',
  body: 'Tell us where you want to be in six months. We will bring the creative, the strategy, and the crew to get you there.',
  cta: { label: 'Start a project', href: '#contact' },
};

export const ctaStudio = {
  id: 'cta-studio',
  label: 'Studio on rent',
  headline: 'Book the studio for your next shoot.',
  body: 'A fully equipped space for product shoots, model photography, campaign work, and podcast recording — with the gear and the crew already in it.',
  cta: { label: 'Book a studio space', href: '#contact' },
  meta: ['Cyclorama wall', 'Profoto lighting', 'Podcast setup', 'Half or full day'],
};

export const showreel = {
  label: 'Showreel',
  headline: 'Watch the reel.',
  body: 'Ninety seconds from the floor — campaigns, product, and motion cut together.',
  src: galleryVideos.cameraRig,
  poster: galleryImages.g6,
  duration: '01:30',
};
