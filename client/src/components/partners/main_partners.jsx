import SectionLabel from './section_label';
import LogoMarquee from './logo_marquee';
import './partners.css';

/**
 * The marquee sits inside a bordered panel rather than running
 * full-bleed. Contained, it reads as a deliberate client wall; bleeding
 * off both edges it read as background texture.
 */
export default function Partners() {
  return (
    <section id="clients" className="pmk" aria-label="Clients">
      <div className="pmk__inner">
        <SectionLabel />

        <div className="pmk__panel">
          <div className="pmk__panel-head">
            <span className="label">Selected clients</span>
            <span className="label pmk__count">24+</span>
          </div>
          <LogoMarquee />
        </div>
      </div>
    </section>
  );
}
