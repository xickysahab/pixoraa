import { useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import { serviceImages } from '../../data/media';
import { entry } from '../../common/motion_env';
import useReveal from '../../common/use_reveal';

/**
 * One service: a wide plate with the copy card overlapping its lower
 * edge — the editorial overlap that stops an image-plus-caption stack
 * reading like a blog post.
 *
 * The photograph is oversized inside its frame and translated against
 * scroll, so the image drifts within a fixed window rather than the
 * whole block sliding. Reveals with a clip-path wipe from the bottom,
 * which keeps the frame's geometry intact while it opens.
 */
export default function ServiceBlock({ service, index, onActive }) {
  const ref = useRef(null);
  const frameRef = useRef(null);
  const shown = useReveal(frameRef, { amount: 0.2 });

  // A tall probe band in the upper half of the viewport decides which
  // block owns the sticky rail, so the rail changes over at a
  // consistent point rather than whenever a block happens to intersect.
  const active = useInView(ref, { margin: '-25% 0px -55% 0px' });

  useEffect(() => {
    if (active) onActive?.(index);
  }, [active, index, onActive]);

  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-14%', '14%']);

  return (
    <article className="svc__block" id={`service-${service.id}`} ref={ref}>
      <motion.div
        ref={frameRef}
        className="svc__frame"
        initial={entry({ clipPath: 'inset(100% 0 0 0)' })}
        animate={{ clipPath: shown ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)' }}
        transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
      >
        <motion.img
          className="svc__photo"
          src={serviceImages[service.id]}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ y }}
        />
        <span className="svc__frame-wash" aria-hidden="true" />
        <span className="svc__frame-grain" aria-hidden="true" />
        <span className="svc__frame-index" aria-hidden="true">
          {service.index}
        </span>
      </motion.div>

      <motion.div
        className="svc__card"
        initial={entry({ opacity: 0, y: 32 })}
        animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
      >
        <span className="svc__rule" aria-hidden="true" />
        <h3 className="svc__name display">{service.title}</h3>
        <p className="svc__blurb">{service.blurb}</p>
        <p className="svc__detail-text">{service.detail}</p>

        <ul className="svc__tags">
          {service.tags.map((t) => (
            <li className="svc__tag" key={t}>{t}</li>
          ))}
        </ul>

        <a href="#contact" className="svc__explore">
          Explore service
          <span className="svc__explore-disc" aria-hidden="true">
            <svg viewBox="0 0 16 16" width="12" height="12" fill="none">
              <path
                d="M3 13L13 3M13 3H5.5M13 3v7.5"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
      </motion.div>
    </article>
  );
}
