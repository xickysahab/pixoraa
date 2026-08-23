import SectionWrapper from '../../common/section_wrapper';
import RevealText from '../../common/reveal_text';
import Eyebrow from '../../common/eyebrow';
import Button from '../../common/button';
import FaqList from './faq_list';
import { faqIntro } from '../../data/faq';
import './faq.css';

export default function Faq() {
  return (
    <SectionWrapper id="faq" className="faq" label="Frequently asked questions">
      <div className="faq__layout">
        <header className="faq__head">
          <Eyebrow>{faqIntro.label}</Eyebrow>
          <RevealText
            as="h2"
            lines={[faqIntro.headline]}
            className="faq__heading sec-title"
          />
          <p className="faq__intro">{faqIntro.body}</p>
          <Button href={faqIntro.ctaHref}>{faqIntro.ctaLabel}</Button>
        </header>

        <FaqList />
      </div>
    </SectionWrapper>
  );
}
