import { partnersIntro } from '../../data/partners';
import RevealText from '../../common/reveal_text';
import Eyebrow from '../../common/eyebrow';

export default function SectionLabel() {
  return (
    <header className="pmk__head">
      <Eyebrow>{partnersIntro.label}</Eyebrow>
      <RevealText
        as="h2"
        lines={['Trusted by brands', 'who shape the world.']}
        className="pmk__title sec-title"
      />
    </header>
  );
}
