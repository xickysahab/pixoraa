import { AnimatePresence, motion } from 'motion/react';

/**
 * The flash. Two layers, because a real strobe is not a white fade:
 *
 *  - a hard full-frame white that spikes in ~60ms and decays over ~450ms,
 *    which is roughly a speedlight's t.5 curve;
 *  - a radial bloom centred on the lens, so the light reads as coming
 *    from the camera rather than from the browser.
 *
 * The decay is what the site is revealed through, so this doubles as the
 * transition rather than being followed by one.
 */
export default function FlashBurst({ fire }) {
  return (
    <AnimatePresence>
      {fire && (
        <>
          <motion.div
            className="flash__bloom"
            initial={{ opacity: 0, scale: 0.35 }}
            animate={{ opacity: [0, 1, 0], scale: [0.35, 2.4, 3.2] }}
            transition={{ duration: 0.55, times: [0, 0.12, 1], ease: 'easeOut' }}
          />
          <motion.div
            className="flash__sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.9, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, times: [0, 0.1, 0.22, 1], ease: 'easeOut' }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
