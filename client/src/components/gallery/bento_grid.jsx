import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import MediaItem from './media_item';
import HoverVideo from './hover_video';
import { entry, STATIC_MOTION } from '../../common/motion_env';
import useReveal from '../../common/use_reveal';

/**
 * Draggable bento wall. Each tile is a still that a short clip plays
 * over on hover, with the caption sliding up out of a mask.
 *
 * `active` is tracked per tile in state rather than left to CSS :hover,
 * because the video needs the same signal — and it has to include
 * keyboard focus, or the whole effect is mouse-only.
 */
export default function BentoGrid({ items, setItems, onOpen }) {
  const [dragging, setDragging] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const gridRef = useRef(null);
  const shown = useReveal(gridRef, { amount: 0.15 });

  // A clip that only plays on hover can never play on a touch device, so
  // on those the <video> is not rendered at all rather than shipped as
  // dead weight the reader can never trigger.
  const reduced =
    STATIC_MOTION ||
    (typeof window !== 'undefined' &&
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        window.matchMedia('(hover: none)').matches));

  function reorder(from, offset) {
    const distance = offset.x + offset.y;
    if (Math.abs(distance) < 50) return;

    const to =
      distance > 0
        ? Math.min(from + 1, items.length - 1)
        : Math.max(from - 1, 0);
    if (to === from) return;

    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setItems(next);
  }

  return (
    <motion.ul
      ref={gridRef}
      className="bento"
      initial="hidden"
      animate={shown ? 'show' : 'hidden'}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
    >
      {items.map((item, i) => {
        const isActive = activeId === item.id && !dragging;

        return (
          <motion.li
            key={item.id}
            layout
            /* item.span carries the grid footprint (g-tall / g-wide).
               Without it every cell falls back to a single 64px auto row
               and the whole bento collapses into strips. */
            className={`bento__cell ${item.span} ${
              isActive ? 'bento__cell--on' : ''
            }`}
            variants={{
              hidden: entry({ y: 40, scale: 0.94, opacity: 0 }) || {},
              show: {
                y: 0,
                scale: 1,
                opacity: 1,
                transition: { type: 'spring', stiffness: 320, damping: 26 },
              },
            }}
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.6}
            onDragStart={() => setDragging(true)}
            onDragEnd={(_, info) => {
              setDragging(false);
              reorder(i, info.offset);
            }}
            whileDrag={{ scale: 1.04, zIndex: 40 }}
            onMouseEnter={() => setActiveId(item.id)}
            onMouseLeave={() => setActiveId(null)}
          >
            <button
              type="button"
              className="bento__btn"
              onClick={() => !dragging && onOpen(item)}
              onFocus={() => setActiveId(item.id)}
              onBlur={() => setActiveId(null)}
              aria-label={`${item.title} — ${item.desc}`}
            >
              <MediaItem item={item} className="bento__media" />

              {item.video && (
                <HoverVideo
                  src={item.video}
                  active={isActive}
                  reduced={reduced}
                />
              )}

              <span className="bento__scrim" aria-hidden="true" />

              {item.video && (
                <span className="bento__badge" aria-hidden="true">
                  <span className="bento__badge-dot" />
                  Reel
                </span>
              )}

              <span className="bento__meta" aria-hidden="true">
                <span className="bento__mask">
                  <span className="bento__title">{item.title}</span>
                </span>
                <span className="bento__mask">
                  <span className="bento__desc">{item.desc}</span>
                </span>
              </span>
            </button>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
