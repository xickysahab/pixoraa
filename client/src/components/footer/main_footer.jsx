import FooterLogo from './footer_logo';
import FooterNav from './footer_nav';
import NewsletterForm from './newsletter_form';
import SocialLinks from './social_links';
import StudioClock from './studio_clock';
import { site } from '../../data/site';
import './footer.css';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="foot__inner">
        <div className="foot__top">
          <p className="foot__pitch display">
            Your next project deserves world-class design.
            <span className="foot__pitch-dim">
              {' '}Stop settling for mediocre.
            </span>
          </p>
        </div>

        <div className="foot__cols">
          <div className="foot__brand">
            <p className="label foot__col-label">Studio</p>
            <p className="foot__based">{site.base}</p>
            <StudioClock />
          </div>

          <FooterNav />
          <SocialLinks />
          <NewsletterForm />
        </div>

        <div className="foot__meta">
          <p>© {site.since}–2025 {site.name}. All rights reserved.</p>
          <p className="foot__meta-dim">Built in Delhi.</p>
        </div>
      </div>

      <FooterLogo />
    </footer>
  );
}
