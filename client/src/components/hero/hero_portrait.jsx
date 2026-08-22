import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { entry } from '../../common/motion_env';
import { hero as heroMedia } from '../../data/media';

/**
 * The centre portrait. Shot on black, then grayscaled and laid over the
 * molten canvas with a screen blend — the dark ground dissolves and the
 * subject reads as lit by the page itself. A duotone from CSS alone,
 * no cut-out needed; swap the photo and the treatment holds.
 */
export default function HeroPortrait() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Starts a little high so the face stays in the open field,
  // then drifts down slower than the page — depth, not motion.
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '10%']);

  return (
    <motion.div
      ref={ref}
      className="hero__portrait"
      aria-hidden="true"
      initial={entry({ opacity: 0, y: 60 })}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.img
        className="hero__portrait-img"
        src={heroMedia.portrait}
        alt=""
        decoding="async"
        style={{ y }}
      />
    </motion.div>
  );
}
