/**
 * Every photograph on the site, imported once.
 *
 * Vite fingerprints and bundles anything imported from `assets/`, so
 * images go through here rather than being referenced by string path —
 * a string path silently 404s in a production build.
 *
 * Source: Unsplash. The Unsplash License permits commercial use without
 * attribution. These are placeholders standing in for Pixoraa's own
 * work — swap each file for the real shoot and nothing else changes.
 */

// ---- hero ----
import heroPortrait from '../assets/images/hero/hero-portrait.jpg';

// ---- services ----
import svcPhotography from '../assets/images/services/photography.jpg';
import svcStudio from '../assets/images/services/studio.jpg';
import svcContent from '../assets/images/services/content.jpg';
import svcGraphic from '../assets/images/services/graphic.jpg';
import svcInfluencer from '../assets/images/services/influencer.jpg';
import svcWeb from '../assets/images/services/web.jpg';

// ---- work ----
import wkQuantum from '../assets/images/work/quantum.jpg';
import wkCubekit from '../assets/images/work/cubekit.jpg';
import wkEphemeral from '../assets/images/work/ephemeral.jpg';
import wkWarpspeed from '../assets/images/work/warpspeed.jpg';
import wkMagnolia from '../assets/images/work/magnolia.jpg';
import wkGlobalBank from '../assets/images/work/global-bank.jpg';

// ---- process phases ----
import prDiscovery from '../assets/images/process/discovery.jpg';
import prStrategy from '../assets/images/process/strategy.jpg';
import prCreation from '../assets/images/process/creation.jpg';
import prLaunch from '../assets/images/process/launch.jpg';
import prGrowth from '../assets/images/process/growth.jpg';

// ---- insights ----
import inShotDay from '../assets/images/insights/shot-day.jpg';
import inRetouching from '../assets/images/insights/retouching.jpg';
import inLighting from '../assets/images/insights/lighting.jpg';

// ---- gallery hover clips ----
import vStudioLight from '../assets/video/studio-light.mp4';
import vLightingSet from '../assets/video/lighting-set.mp4';
import vCameraRig from '../assets/video/camera-rig.mp4';
import vGlassware from '../assets/video/glassware.mp4';
import vTripodCheck from '../assets/video/tripod-check.mp4';
import vUmbrellaSet from '../assets/video/umbrella-set.mp4';
import vMonitorReview from '../assets/video/monitor-review.mp4';

// ---- gallery ----
import g1 from '../assets/images/gallery/g1-review.jpg';
import g2 from '../assets/images/gallery/g2-setup.jpg';
import g3 from '../assets/images/gallery/g3-floor.jpg';
import g4 from '../assets/images/gallery/g4-tripod.jpg';
import g5 from '../assets/images/gallery/g5-umbrella.jpg';
import g6 from '../assets/images/gallery/g6-shoot.jpg';
import g7 from '../assets/images/gallery/g7-product.jpg';

export const hero = { portrait: heroPortrait };

export const serviceImages = {
  photography: svcPhotography,
  studio: svcStudio,
  content: svcContent,
  graphic: svcGraphic,
  influencer: svcInfluencer,
  web: svcWeb,
};

export const workImages = {
  quantum: wkQuantum,
  cubekit: wkCubekit,
  ephemeral: wkEphemeral,
  warpspeed: wkWarpspeed,
  magnolia: wkMagnolia,
  'global-bank': wkGlobalBank,
};

/** Keyed by process step id. */
export const processImages = {
  discovery: prDiscovery,
  strategy: prStrategy,
  creation: prCreation,
  launch: prLaunch,
  growth: prGrowth,
};

/** Keyed by insight post id. */
export const insightImages = {
  'shot-day': inShotDay,
  retouching: inRetouching,
  lighting: inLighting,
};

/**
 * Short muted loops that play over a tile's still on hover. Kept small
 * and SD on purpose — these are thumbnails, and they are fetched only
 * when a tile is actually hovered.
 */
export const galleryVideos = {
  studioLight: vStudioLight,
  lightingSet: vLightingSet,
  cameraRig: vCameraRig,
  glassware: vGlassware,
  tripodCheck: vTripodCheck,
  umbrellaSet: vUmbrellaSet,
  monitorReview: vMonitorReview,
};

export const galleryImages = { g1, g2, g3, g4, g5, g6, g7 };
