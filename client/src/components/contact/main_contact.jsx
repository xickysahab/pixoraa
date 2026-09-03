import SectionWrapper from '../../common/section_wrapper';
import RevealText from '../../common/reveal_text';
import Eyebrow from '../../common/eyebrow';
import ContactForm from './contact_form';
import { contactIntro, contactChannels } from '../../data/contact';
import './contact.css';

/**
 * Carries id="contact" — every `#contact` link on the page (header CTA,
 * hero, service blocks, work cards) used to land on the footer, which
 * had nothing to act on. They land here now.
 */
export default function Contact() {
  return (
    <SectionWrapper id="contact" className="ctc" label="Contact us">
      <div className="ctc__layout">
        <header className="ctc__head">
          <Eyebrow>{contactIntro.label}</Eyebrow>
          <RevealText
            as="h2"
            lines={[contactIntro.headline]}
            className="ctc__heading sec-title"
          />
          <p className="ctc__intro">{contactIntro.body}</p>

          <ul className="ctc__channels">
            {contactChannels.map((c) => (
              <li className="ctc__channel" key={c.id}>
                <span className="label ctc__channel-label">{c.label}</span>
                <a className="ctc__channel-value" href={c.href}>{c.value}</a>
              </li>
            ))}
          </ul>
        </header>

        <ContactForm />
      </div>
    </SectionWrapper>
  );
}
