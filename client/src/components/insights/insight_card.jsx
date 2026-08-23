import { useRef } from 'react';
import { motion } from 'motion/react';
import { insightImages } from '../../data/media';
import { entry } from '../../common/motion_env';
import useReveal from '../../common/use_reveal';

/**
 * One journal card. The date runs vertically down the left edge of the
 * image beside a row of sprocket ticks — a film-strip cue that ties the
 * journal to the rest of a photography studio's site rather than making
 * it look like a generic blog grid.
 *
 * Rendered as an <article>, not a link: these posts do not exist yet, so
 * a card that navigates nowhere would be a dead end. Swap the wrapper
 * for an <a> once the journal is live.
 */
export default function InsightCard({ post, index }) {
  const ref = useRef(null);
  const shown = useReveal(ref, { amount: 0.2 });

  return (
    <motion.article
      ref={ref}
      className="ins__card"
      initial={entry({ opacity: 0, y: 38 })}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 38 }}
      transition={{
        duration: 0.75,
        delay: shown ? index * 0.08 : 0,
        ease: [0.23, 1, 0.32, 1],
      }}
    >
      <div className="ins__frame">
        <img
          className="ins__photo"
          src={insightImages[post.id]}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <span className="ins__scrim" aria-hidden="true" />

        <span className="ins__strip" aria-hidden="true">
          <span className="ins__ticks">
            {Array.from({ length: 4 }, (_, i) => (
              <span className="ins__tick" key={i} />
            ))}
          </span>
          <time className="ins__date" dateTime={post.dateISO}>
            {post.date}
          </time>
        </span>

        <span className="ins__category">{post.category}</span>
      </div>

      <div className="ins__body">
        <h3 className="ins__title display">{post.title}</h3>
        <p className="ins__excerpt">{post.excerpt}</p>

        <footer className="ins__meta">
          <span className="ins__avatar" aria-hidden="true">
            {post.author.split(' ').map((w) => w[0]).join('')}
          </span>
          <span className="ins__byline">
            <span className="ins__author">{post.author}</span>
            <span className="ins__role">{post.role}</span>
          </span>
          <span className="ins__read">{post.readTime}</span>
        </footer>
      </div>
    </motion.article>
  );
}
