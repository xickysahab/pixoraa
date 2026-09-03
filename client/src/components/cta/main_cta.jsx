import RevealText from '../../common/reveal_text';
import Eyebrow from '../../common/eyebrow';
import Button from '../../common/button';
import './cta.css';

/**
 * The mid-page conversion break. Deliberately one component used twice
 * with different copy — two hand-built banners drift apart the first
 * time either is edited.
 *
 * `variant="molten"` flips the band onto solid accent, the same
 * inversion the hero uses, so the two instances never read as a
 * repeated block on one scroll.
 */
export default function Cta({ data, variant = 'ink' }) {
  return (
    <section
      id={data.id}
      className={`ctab ctab--${variant}`}
      aria-label={data.headline}
    >
      <div className="ctab__inner">
        <Eyebrow className="ctab__eyebrow">{data.label}</Eyebrow>

        <div className="ctab__body">
          <RevealText
            as="h2"
            lines={[data.headline]}
            className="ctab__heading sec-title"
          />

          <div className="ctab__aside">
            <p className="ctab__copy">{data.body}</p>
            <Button href={data.cta.href}>{data.cta.label}</Button>
          </div>
        </div>

        {data.meta && (
          <ul className="ctab__meta">
            {data.meta.map((m) => (
              <li className="label ctab__meta-item" key={m}>{m}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
