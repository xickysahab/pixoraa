import { hero } from '../../data/site';
import RevealText from '../../common/reveal_text';

/** The giant right-set display — what the studio is, poster-sized. */
export default function HeroHeadline() {
  return (
    <RevealText
      as="h1"
      lines={hero.headline}
      className="hero__headline display"
      delay={0.3}
      stagger={0.09}
      trigger="mount"
    />
  );
}
