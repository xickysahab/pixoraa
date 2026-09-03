import SectionWrapper from '../../common/section_wrapper';
import RevealText from '../../common/reveal_text';
import Eyebrow from '../../common/eyebrow';
import Button from '../../common/button';
import { pillarsIntro, pillars } from '../../data/proof';
import './pillars.css';

/** The three differentiators — why this studio rather than the next one. */
export default function Pillars() {
  return (
    <SectionWrapper id="why" className="why" label="Why work with us">
      <div className="why__head">
        <div>
          <Eyebrow>{pillarsIntro.label}</Eyebrow>
          <RevealText
            as="h2"
            lines={[pillarsIntro.headline]}
            className="why__heading sec-title"
          />
        </div>

        <div className="why__aside">
          <p className="why__intro">{pillarsIntro.body}</p>
          <Button href={pillarsIntro.cta.href} variant="ghost">
            {pillarsIntro.cta.label}
          </Button>
        </div>
      </div>

      <ul className="why__grid">
        {pillars.map((p) => (
          <li className="why__card" key={p.id}>
            <span className="label why__index">{p.index}</span>
            <h3 className="why__title">{p.title}</h3>
            <p className="why__copy">{p.body}</p>
          </li>
        ))}
      </ul>
    </SectionWrapper>
  );
}
