import SectionWrapper from '../../common/section_wrapper';
import RevealText from '../../common/reveal_text';
import Eyebrow from '../../common/eyebrow';
import Counter from '../../common/counter';
import { statsIntro, stats } from '../../data/proof';
import './stats.css';

/**
 * The proof strip directly under the hero. Numbers count up once on
 * entry — the figure is the headline here, so the caption is set small
 * and the suffix stays glued to the digit rather than wrapping.
 */
export default function Stats() {
  return (
    <SectionWrapper id="stats" className="stats" label="Studio by the numbers">
      <div className="stats__head">
        <div>
          <Eyebrow>{statsIntro.label}</Eyebrow>
          <RevealText
            as="h2"
            lines={[statsIntro.headline]}
            className="stats__heading sec-title"
          />
        </div>
        <p className="stats__intro">{statsIntro.body}</p>
      </div>

      <dl className="stats__grid">
        {stats.map((s) => (
          <div className="stats__cell" key={s.id}>
            <dt className="stats__figure display">
              <Counter value={s.value} />
              <span className="stats__suffix">{s.suffix}</span>
            </dt>
            <dd className="stats__caption">{s.caption}</dd>
          </div>
        ))}
      </dl>
    </SectionWrapper>
  );
}
