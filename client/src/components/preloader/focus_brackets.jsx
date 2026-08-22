import { motion } from 'motion/react';

/**
 * Viewfinder autofocus brackets. They start wide and hunt inward onto
 * the subject, then snap molten on focus lock — the visual grammar any
 * photographer reads instantly as "about to fire".
 */
const CORNERS = [
  { id: 'tl', d: 'M0 14V0h14', x: -1, y: -1 },
  { id: 'tr', d: 'M0 0h14v14', x: 1, y: -1 },
  { id: 'br', d: 'M14 0v14H0', x: 1, y: 1 },
  { id: 'bl', d: 'M14 14H0V0', x: -1, y: 1 },
];

export default function FocusBrackets({ locked, hunting }) {
  return (
    <div className="af" aria-hidden="true">
      {CORNERS.map((c, i) => (
        <motion.span
          key={c.id}
          className={`af__corner af__corner--${c.id} ${locked ? 'af__corner--lock' : ''}`}
          initial={{ x: c.x * 90, y: c.y * 90, opacity: 0 }}
          animate={
            hunting
              ? { x: c.x * 8, y: c.y * 8, opacity: 1 }
              : { x: c.x * 90, y: c.y * 90, opacity: 0 }
          }
          transition={{
            duration: 0.65,
            delay: i * 0.04,
            ease: [0.23, 1, 0.32, 1],
          }}
        >
          <svg viewBox="0 0 14 14" width="14" height="14" fill="none">
            <path d={c.d} stroke="currentColor" strokeWidth="2" />
          </svg>
        </motion.span>
      ))}
    </div>
  );
}
