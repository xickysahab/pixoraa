import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import MediaItem from './media_item';
import { entry } from '../../common/motion_env';
import useReveal from '../../common/use_reveal';

/**
 * Draggable bento grid. Dragging a tile past a threshold swaps it with
 * its neighbour, so the reader can rearrange the wall.
 *
 * Each tile is a real <button>: the original made a div clickable,
 * which left the whole gallery unreachable by keyboard.
 */
export default function BentoGrid({ items, setItems, onOpen }) {
  const [dragging, setDragging] = useState(false);
  const gridRef = useRef(null);
  const shown = useReveal(gridRef, { amount: 0.15 });

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
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.06 } },
      }}
    >
      {items.map((item, i) => (
        <motion.li
          key={item.id}
          layout
          className={`bento__cell ${item.span}`}
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
        >
          <button
            type="button"
            className="bento__btn"
            onClick={() => !dragging && onOpen(item)}
            aria-label={`${item.title} — ${item.desc}`}
          >
            <MediaItem item={item} className="bento__media" />
            <span className="bento__scrim" aria-hidden="true" />
            <span className="bento__meta">
              <span className="bento__title">{item.title}</span>
              <span className="bento__desc">{item.desc}</span>
            </span>
          </button>
        </motion.li>
      ))}
    </motion.ul>
  );
}
