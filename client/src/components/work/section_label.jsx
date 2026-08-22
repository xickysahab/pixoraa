import { workIntro } from '../../data/projects';
import RevealText from '../../common/reveal_text';
import Eyebrow from '../../common/eyebrow';
import { site } from '../../data/site';

export default function SectionLabel() {
  return (
    <header className="work__head">
      <Eyebrow>{workIntro.label}</Eyebrow>
      <RevealText
        as="h2"
        lines={[workIntro.headline]}
        className="work__title sec-title"
      />
      <p className="work__intro">{workIntro.body}</p>
      <span className="work__copyright label">
        © {site.since} — 2025
      </span>
    </header>
  );
}
