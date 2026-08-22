import HeroIntro from './hero_intro';
import HeroHeadline from './hero_headline';
import HeroPortrait from './hero_portrait';
import HeroCards from './hero_cards';
import HeroWordmark from './hero_wordmark';
import './hero.css';

/**
 * Composes the hero. The only hero file App.jsx imports.
 *
 * The hero flips the page's palette: molten becomes the canvas and the
 * dark ink becomes the accent. Layout is a poster, not a stack —
 * statement top-left, giant display top-right, portrait rising from the
 * bottom edge, proof cards floating over the field, and the wordmark
 * run off the trim like a print crop.
 */
export default function Hero() {
  return (
    <section id="top" className="hero" aria-label="Introduction">
      <HeroPortrait />

      <div className="hero__inner">
        <div className="hero__top">
          <HeroIntro />
          <HeroHeadline />
        </div>

        <div className="hero__stage">
          <HeroCards />
        </div>
      </div>

      <HeroWordmark />
    </section>
  );
}
