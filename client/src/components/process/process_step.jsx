import { useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { entry } from '../../common/motion_env';
import useReveal from '../../common/use_reveal';

/**
 * One phase. Reports its own in-view state upward so the sticky column
 * can track which phase the reader is actually on.
 */
export default function ProcessStep({ step, index, onEnter }) {
  const ref = useRef(null);
  const shown = useReveal(ref, { amount: 0.3 });
  const inView = useInView(ref, { amount: 0.6, margin: '-20% 0px -20% 0px' });

  // Notify the parent from an effect, never during render — setting
  // parent state mid-render warns and can loop.
  useEffect(() => {
    if (inView) onEnter?.(index);
  }, [inView, index, onEnter]);

  return (
    <motion.li
      ref={ref}
      className={`proc__step ${inView ? 'proc__step--on' : ''}`}
      initial={entry({ opacity: 0, y: 34 })}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 34 }}
      transition={{ duration: 0.75, ease: [0.23, 1, 0.32, 1] }}
    >
      <span className="proc__num label">/{step.num}/</span>
      <div className="proc__body">
        <h3 className="proc__title display">{step.title}</h3>
        <p className="proc__blurb">{step.blurb}</p>
        <p className="proc__detail">{step.detail}</p>
      </div>
    </motion.li>
  );
}
