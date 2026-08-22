import { galleryImages } from './media';

export const galleryIntro = {
  label: 'Inside the studio',
  title: 'Frames from the floor',
  description: 'Drag to reorder. Tap any frame to open it.',
};

/**
 * `span` drives the bento footprint at each breakpoint.
 * Set `type: 'video'` with a `url` to use footage instead of a still.
 *
 * Captions describe the frame itself — these are studio-floor shots,
 * not case-study covers, so borrowing client names here just made the
 * grid contradict its own images.
 */
export const galleryItems = [
  {
    id: 1,
    type: 'image',
    url: galleryImages.g6,
    title: 'On location',
    desc: 'Handheld rig, campaign film',
    span: 'g-tall',
  },
  {
    id: 2,
    type: 'image',
    url: galleryImages.g3,
    title: 'Studio floor',
    desc: 'Cyclorama and strobes, Delhi',
    span: 'g-wide',
  },
  {
    id: 3,
    type: 'image',
    url: galleryImages.g7,
    title: 'Colour on colour',
    desc: 'Footwear still, product set',
    span: 'g-tall',
  },
  {
    id: 4,
    type: 'image',
    url: galleryImages.g2,
    title: 'Set build',
    desc: 'Still-life table under RGB tubes',
    span: 'g-wide',
  },
  {
    id: 5,
    type: 'image',
    url: galleryImages.g4,
    title: 'Camera check',
    desc: 'Key light and tripod, pre-shoot',
    span: 'g-tall',
  },
  {
    id: 6,
    type: 'image',
    url: galleryImages.g5,
    title: 'Studio still',
    desc: 'Medium format under the umbrella',
    span: 'g-wide',
  },
  {
    id: 7,
    type: 'image',
    url: galleryImages.g1,
    title: 'Frame check',
    desc: 'Reviewing takes on the monitor',
    span: 'g-tall',
  },
];
