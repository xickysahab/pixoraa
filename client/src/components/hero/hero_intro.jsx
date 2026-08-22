import { motion } from 'motion/react';
import { hero } from '../../data/site';
import { entry } from '../../common/motion_env';
import Eyebrow from '../../common/eyebrow';
import Button from '../../common/button';
import ClientAvatars from './client_avatars';
import RatingBadge from './rating_badge';

/** Top-left column: eyebrow, statement, CTAs, social proof. */
export default function HeroIntro() {
  return (
    <motion.div
      className="hero__intro"
      initial={entry({ opacity: 0, y: 20 })}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <Eyebrow>{hero.eyebrow}</Eyebrow>

      <p className="hero__statement">{hero.statement}</p>

      <div className="hero__actions">
        <Button href={hero.primaryCta.href} variant="solid">
          {hero.primaryCta.label}
        </Button>
        <Button href={hero.secondaryCta.href} variant="ghost">
          {hero.secondaryCta.label}
        </Button>
      </div>

      <div className="hero__proof">
        <ClientAvatars />
        <RatingBadge />
      </div>
    </motion.div>
  );
}
