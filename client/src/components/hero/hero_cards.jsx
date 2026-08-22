import { motion } from 'motion/react';
import { hero } from '../../data/site';
import { entry } from '../../common/motion_env';
import Counter from '../../common/counter';

/**
 * Proof floating over the canvas: bone stat chips on the left, the dark
 * growth card on the right. On small screens they fall back into flow
 * above the wordmark.
 */
export default function HeroCards() {
  return (
    <div className="hcards">
      <ul className="hcards__stats">
        {hero.stats.map((s, i) => (
          <motion.li
            key={s.id}
            className="hcards__stat"
            initial={entry({ opacity: 0, y: 26 })}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.85 + i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span className="hcards__value">
              <Counter value={s.value} />
              <em className="hcards__suffix">{s.suffix}</em>
            </span>
            <span className="hcards__caption">{s.caption}</span>
          </motion.li>
        ))}
      </ul>

      <motion.aside
        className="hcards__growth"
        initial={entry({ opacity: 0, y: 26 })}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2 className="hcards__title">{hero.growthCard.title}</h2>
        <p className="hcards__copy">{hero.growthCard.copy}</p>
        <a className="hcards__link" href={hero.growthCard.cta.href}>
          {hero.growthCard.cta.label}
          <svg viewBox="0 0 16 16" width="13" height="13" fill="none" aria-hidden="true">
            <path
              d="M3 13L13 3M13 3H5.5M13 3v7.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <span className="hcards__foot label">{hero.growthCard.footer}</span>
      </motion.aside>
    </div>
  );
}
