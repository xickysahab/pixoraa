import { processIntro } from '../../data/process';
import RevealText from '../../common/reveal_text';
import Eyebrow from '../../common/eyebrow';

export default function SectionLabel() {
  return (
    <header className="proc__head">
      <Eyebrow>{processIntro.label}</Eyebrow>
      <RevealText
        as="h2"
        lines={processIntro.headline}
        className="proc__heading sec-title"
      />
      <p className="proc__intro">{processIntro.body}</p>
    </header>
  );
}
