import { motion } from 'motion/react';
import { hero } from '../../data/site';
import { entry } from '../../common/motion_env';

/**
 * The giant type at the hero's bottom edge, clipped mid-letter the way
 * a poster runs off its trim. Decorative — the name is already in the
 * header logo, so screen readers skip this copy.
 */
export default function HeroWordmark() {
  return (
    <div className="hero__wordmark" aria-hidden="true">
      <motion.span
        className="hero__wordmark-text"
        initial={entry({ y: '60%' })}
        animate={{ y: '0%' }}
        transition={{ duration: 1.1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {hero.wordmark}
      </motion.span>
    </div>
  );
}
