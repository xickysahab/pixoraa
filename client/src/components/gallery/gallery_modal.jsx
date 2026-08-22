import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import MediaItem from './media_item';

/**
 * Lightbox with a draggable filmstrip dock.
 *
 * The original closed only on click. A lightbox that traps the reader
 * with no keyboard exit is a genuine accessibility failure, so this one
 * closes on Escape, locks background scroll, moves focus in on open,
 * and returns it on close. Arrow keys step through the set.
 */
export default function GalleryModal({ item, items, onSelect, onClose }) {
  const [dock, setDock] = useState({ x: 0, y: 0 });
  const panelRef = useRef(null);
  const index = items.findIndex((i) => i.id === item.id);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();

    function onKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onSelect(items[(index + 1) % items.length]);
      if (e.key === 'ArrowLeft') {
        onSelect(items[(index - 1 + items.length) % items.length]);
      }
    }

    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [index, items, onSelect, onClose]);

  return (
    <>
      <motion.div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        className="gmodal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
      >
        <button
          type="button"
          className="gmodal__backdrop"
          onClick={onClose}
          aria-label="Close gallery"
        />

        <div className="gmodal__stage">
          <AnimatePresence mode="wait">
            <motion.figure
              key={item.id}
              className="gmodal__figure"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            >
              <MediaItem item={item} className="gmodal__media" />
              <figcaption className="gmodal__cap">
                <h3 className="gmodal__title">{item.title}</h3>
                <p className="gmodal__desc">{item.desc}</p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <button
          type="button"
          className="gmodal__close"
          onClick={onClose}
          aria-label="Close"
        >
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
            <path
              d="M3 3l10 10M13 3L3 13"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </motion.div>

      {/* Draggable filmstrip */}
      <motion.div
        drag
        dragMomentum={false}
        dragElastic={0.1}
        initial={false}
        animate={{ x: dock.x, y: dock.y }}
        onDragEnd={(_, info) =>
          setDock((p) => ({ x: p.x + info.offset.x, y: p.y + info.offset.y }))
        }
        className="gdock"
      >
        <ul className="gdock__strip">
          {items.map((it, i) => (
            <li key={it.id}>
              <motion.button
                type="button"
                className={`gdock__cell ${
                  it.id === item.id ? 'gdock__cell--on' : ''
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(it);
                }}
                style={{ zIndex: it.id === item.id ? 30 : items.length - i }}
                animate={{
                  scale: it.id === item.id ? 1.18 : 1,
                  rotate: it.id === item.id ? 0 : i % 2 === 0 ? -12 : 12,
                  y: it.id === item.id ? -8 : 0,
                }}
                whileHover={{ scale: 1.28, rotate: 0, y: -10 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                aria-label={it.title}
                aria-current={it.id === item.id}
              >
                <MediaItem item={it} className="gdock__media" />
              </motion.button>
            </li>
          ))}
        </ul>
      </motion.div>
    </>
  );
}
