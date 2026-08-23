import { useId } from 'react';
import { AnimatePresence, motion } from 'motion/react';

/**
 * One question.
 *
 * A real <button> inside an <h3>, with aria-expanded and aria-controls
 * wired to the panel — that combination is what makes an accordion
 * usable by keyboard and announceable by a screen reader. A div with a
 * click handler looks identical and is unreachable without a mouse.
 *
 * The panel animates height to 'auto', so answers of different lengths
 * each open to their own size instead of a fixed guess.
 */
export default function FaqItem({ item, open, onToggle }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const btnId = `faq-btn-${uid}`;
  const panelId = `faq-panel-${uid}`;

  return (
    <div className={`faq__item ${open ? 'faq__item--open' : ''}`}>
      <h3 className="faq__q">
        <button
          type="button"
          id={btnId}
          className="faq__trigger"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="faq__q-text">{item.q}</span>
          <span className="faq__icon" aria-hidden="true">
            <span className="faq__icon-bar" />
            <span className="faq__icon-bar faq__icon-bar--v" />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={btnId}
            className="faq__panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="faq__a">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
