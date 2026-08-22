import { motion } from 'motion/react';

/**
 * The menu's own close control.
 *
 * The header's burger toggles to an X, but the overlay sits above the
 * header and buries it — so from the reader's side there was no way out
 * except the Escape key. The dialog owns its own dismiss control.
 */
export default function CloseButton({ onClose }) {
  return (
    <motion.button
      type="button"
      className="mclose"
      onClick={onClose}
      aria-label="Close menu"
      initial={{ opacity: 0, rotate: -90 }}
      animate={{ opacity: 1, rotate: 0 }}
      exit={{ opacity: 0, rotate: -90, transition: { duration: 0.15 } }}
      transition={{ duration: 0.45, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
    >
      <svg viewBox="0 0 18 18" width="16" height="16" fill="none" aria-hidden="true">
        <path
          d="M3 3l12 12M15 3L3 15"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <span className="mclose__label">Close</span>
    </motion.button>
  );
}
