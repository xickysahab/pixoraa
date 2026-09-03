import SectionWrapper from '../../common/section_wrapper';
import RevealText from '../../common/reveal_text';
import Eyebrow from '../../common/eyebrow';
import TestimonialCard from './testimonial_card';
import { testimonialsIntro, testimonials } from '../../data/testimonials';
import './testimonials.css';

/**
 * A scroll-snapped rail rather than a JS carousel: no autoplay timer to
 * fight, no arrows to build, and it is already keyboard- and
 * touch-navigable. On desktop it becomes a plain grid.
 */
export default function Testimonials() {
  const { rating } = testimonialsIntro;

  return (
    <SectionWrapper id="testimonials" className="tst" label="Client testimonials">
      <div className="tst__head">
        <div>
          <Eyebrow>{testimonialsIntro.label}</Eyebrow>
          <RevealText
            as="h2"
            lines={[testimonialsIntro.headline]}
            className="tst__heading sec-title"
          />
        </div>

        <div className="tst__aside">
          <p className="tst__score display">
            {rating.score}
            <span className="tst__score-of">/{rating.outOf}</span>
          </p>
          <p className="tst__intro">
            {testimonialsIntro.body} Based on {rating.count} reviews.
          </p>
        </div>
      </div>

      <ul className="tst__rail">
        {testimonials.map((t) => (
          <li className="tst__item" key={t.id}>
            <TestimonialCard item={t} />
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}
