import { useRef } from 'react';
import { motion } from 'motion/react';
import { STATIC_MOTION, entry } from './motion_env';
import useReveal from './use_reveal';
import './reveal_text.css';

/**
 * Masked line-by-line rise. Each line sits in an overflow-hidden clip so
 * the text appears to climb out from behind a solid edge. Screen readers
 * get the whole string; the split is decorative.
 *
 * trigger:
 *   'mount' — animate immediately. Use above the fold.
 *   'view'  — animate when scrolled into view, via useReveal, which
 *             cannot strand the text off-screen the way a bare
 *             one-shot `whileInView` can.
 */
export default function RevealText({
  lines = [],
  as: Tag = 'h2',
  className = '',
  delay = 0,
  stagger = 0.09,
  trigger = 'view',
}) {
  const ref = useRef(null);
  const inView = useReveal(ref);
  const plain = lines
    .map((l) => (typeof l === 'string' ? l : l.text))
    .join(' ');

  const show = trigger === 'mount' || STATIC_MOTION || inView;

  return (
    <Tag ref={ref} className={`reveal ${className}`} aria-label={plain}>
      {lines.map((line, i) => {
        const text = typeof line === 'string' ? line : line.text;
        const accent = typeof line === 'string' ? false : line.accent;

        return (
          <span className="reveal__line" key={i} aria-hidden="true">
            <motion.span
              className={`reveal__inner ${accent ? 'editor reveal__inner--accent' : ''}`}
              initial={entry({ y: '110%' })}
              animate={{ y: show ? '0%' : '110%' }}
              transition={{
                duration: 0.9,
                delay: show ? delay + i * stagger : 0,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {text}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
