import VelocityMarquee from '../../common/velocity_marquee';
import PartnerLogo from './partner_logo';
import { partnersRowOne, partnersRowTwo } from '../../data/partners';

/**
 * Two strips travelling against each other — top row left, bottom row
 * right. The counter-motion is the whole effect; matching directions
 * just reads as one wide block sliding.
 *
 * Speeds are deliberately slow and slightly different between the rows.
 * Identical speeds make the two strips look mechanically linked, and
 * anything faster turns client names into a blur you cannot read, which
 * defeats the point of a client wall.
 */
export default function LogoMarquee() {
  return (
    <div className="pmarquee">
      <VelocityMarquee baseSpeed={1.3}>
        {partnersRowOne.map((n) => (
          <PartnerLogo key={n} name={n} />
        ))}
      </VelocityMarquee>

      <span className="pmarquee__rule" aria-hidden="true" />

      <VelocityMarquee baseSpeed={1.05} reverse>
        {partnersRowTwo.map((n) => (
          <PartnerLogo key={n} name={n} />
        ))}
      </VelocityMarquee>
    </div>
  );
}
