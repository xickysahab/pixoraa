import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { entry } from '../../common/motion_env';
import useReveal from '../../common/use_reveal';
import { workImages } from '../../data/media';
import ProjectMeta from './project_meta';

/**
 * The hover choreography, all on one `group`:
 *   plate      → slow 1s zoom (the signature easing)
 *   scrim      → darkens
 *   wordmark   → fades out
 *   arrow disc → fades and scales in
 *   meta row   → title shifts right, year slides away
 *
 * The plate also parallaxes a few percent against scroll, so the grid
 * has depth while it moves rather than only on hover.
 */
export default function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const shown = useReveal(ref, { amount: 0.2 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const plateY = useTransform(scrollYProgress, [0, 1], ['-7%', '7%']);

  return (
    <motion.article
      ref={ref}
      className="work__card"
      initial={entry({ opacity: 0, y: 40 })}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.8,
        delay: shown ? (index % 2) * 0.08 : 0,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <a href="#contact" className="work__link" aria-label={`${project.name} — ${project.discipline}`}>
        <div className="work__frame">
          <motion.div className="work__plate" style={{ y: plateY }}>
            <img
              className="work__photo"
              src={workImages[project.id]}
              alt=""
              loading="lazy"
              decoding="async"
            />
          </motion.div>
          <div className="work__grain" aria-hidden="true" />
          <div className="work__scrim" aria-hidden="true" />

          <span className="work__index label" aria-hidden="true">
            [{project.index}]
          </span>

          {/* Client wordmark stands in for a logo lockup until real
              cover art is dropped in. */}
          <span className="work__wordmark" aria-hidden="true">
            {project.name}
          </span>

          <span className="work__disc" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <path
                d="M6 18L18 6M18 6H9M18 6v9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <ProjectMeta project={project} />
      </a>
    </motion.article>
  );
}
