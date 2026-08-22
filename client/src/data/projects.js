export const workIntro = {
  label: 'Selected work',
  headline: 'Case studies',
  body: 'Six shoots from the floor — product, campaign, and editorial. Same studio, same senior crew, start to retouch.',
};

/**
 * `tone` drives the card's plate gradient until real cover imagery
 * lands in assets/images/work.
 *
 * Names and disciplines are written to match what the cover photo
 * actually shows — a caption that contradicts its image reads as a
 * template, not a case study. `id` stays stable: it keys the image
 * lookup in data/media.js.
 */
export const projects = [
  {
    id: 'quantum',
    index: '01',
    name: 'Desk set',
    year: '2025',
    discipline: 'Lifestyle & Product Photography',
    result: 'A working desk built on the floor — screens, props, and daylight — shot as a lifestyle still for a digital brand.',
    tone: 'ember',
  },
  {
    id: 'cubekit',
    index: '02',
    name: 'Still life',
    year: '2024',
    discipline: 'Product Photography',
    result: 'Three bottles stacked on a seamless — one light, one composition, catalogue-ready frames.',
    tone: 'moss',
  },
  {
    id: 'ephemeral',
    index: '03',
    name: 'Fragrance still',
    year: '2024',
    discipline: 'Product Photography & Art Direction',
    result: 'A single bottle on grey paper, foliage in the frame — beauty lighting, one hero shot.',
    tone: 'plum',
  },
  {
    id: 'warpspeed',
    index: '04',
    name: 'Location day',
    year: '2024',
    discipline: 'Location & Exterior Photography',
    result: 'Storefront and glass, shot from the street — identity and space in one frame.',
    tone: 'steel',
  },
  {
    id: 'magnolia',
    index: '05',
    name: 'Beauty set',
    year: '2024',
    discipline: 'Campaign & Product Photography',
    result: 'Pedestals, a painted backdrop, and a full skincare line — campaign stills from a half-day in studio.',
    tone: 'rose',
  },
  {
    id: 'global-bank',
    index: '06',
    name: 'Studio diary',
    year: '2024',
    discipline: 'Behind the Scenes',
    result: 'The desk after a layout day — dual screens, props, and the work in progress.',
    tone: 'ocean',
  },
];
