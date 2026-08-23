import { useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { entry } from '../../common/motion_env';
import useReveal from '../../common/use_reveal';
import { processImages } from '../../data/media';

/**
 * One phase.
 *
 * The connector rail is what makes this read as a sequence rather than
 * five stacked cards. Two timing details do the real work:
 *
 *  - the fill's offsets are both anchored to the same 55% viewport line,
 *    so a segment finishes filling exactly as the next node crosses that
 *    line. Asymmetric offsets left a long grey stretch between the fill
 *    and the next node, which reads as a broken line, not as progress.
 *  - the active state uses a thin probe band at that same line. Waiting
 *    for 60% of the step to be visible meant a tall step on a phone only
 *    lit up once the reader was already halfway through it.
 *
 * The last phase drops the rail — nothing follows it, and a line running
 * into empty space implies a sixth step that does not exist.
 */
export default function ProcessStep({ step, index, isLast, onEnter }) {
  const ref = useRef(null);
  const shown = useReveal(ref, { amount: 0.3 });
  const inView = useInView(ref, { margin: '-55% 0px -44% 0px' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 55%', 'end 55%'],
  });
  const fillScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

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
      {/* ---- rail ---- */}
      <div className="proc__rail-col" aria-hidden="true">
        {!isLast && (
          <span className="proc__line">
            <motion.span
              className="proc__line-fill"
              style={{ scaleY: fillScale }}
            />
          </span>
        )}
        <span className="proc__node">
          <span className="proc__node-dot" />
        </span>
      </div>

      {/* ---- body ---- */}
      <div className="proc__body">
        <div className="proc__pill-row">
          <span className="proc__pill">/{step.title}</span>
          <span className="proc__num">/{step.num}/</span>
        </div>

        <h3 className="proc__title display">{step.blurb}</h3>
        <p className="proc__detail">{step.detail}</p>

        <dl className="proc__facts">
          <div className="proc__fact">
            <dt>Duration</dt>
            <dd>{step.duration}</dd>
          </div>
          <div className="proc__fact">
            <dt>You get</dt>
            <dd>{step.deliverable}</dd>
          </div>
        </dl>
      </div>

      {/* ---- phase photograph ---- */}
      <motion.div
        className="proc__shot"
        initial={entry({ clipPath: 'inset(0 0 100% 0)' })}
        animate={{ clipPath: shown ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)' }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.65, 0, 0.35, 1] }}
      >
        <img
          src={processImages[step.id]}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <span className="proc__shot-wash" aria-hidden="true" />
      </motion.div>
    </motion.li>
  );
}
