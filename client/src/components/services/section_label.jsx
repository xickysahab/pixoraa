import { servicesIntro } from '../../data/services';
import RevealText from '../../common/reveal_text';
import Eyebrow from '../../common/eyebrow';

export default function SectionLabel() {
  return (
    <header className="svc__head">
      <Eyebrow>{servicesIntro.label}</Eyebrow>
      <RevealText
        as="h2"
        lines={servicesIntro.headline}
        className="svc__title sec-title"
      />
      <p className="svc__intro">{servicesIntro.body}</p>
    </header>
  );
}
