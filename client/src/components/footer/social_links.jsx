import { socials, site } from '../../data/site';
import TextSwap from '../../common/text_swap';

export default function SocialLinks() {
  return (
    <div className="foot__social">
      <p className="label foot__col-label">Elsewhere</p>
      <ul className="foot__list">
        {socials.map((s) => (
          <li key={s.id} className="swap-host">
            <a
              href={s.href}
              className="foot__link"
              target="_blank"
              rel="noreferrer noopener"
            >
              <TextSwap>{s.label}</TextSwap>
            </a>
          </li>
        ))}
      </ul>

      <a href={`mailto:${site.email}`} className="foot__email">
        {site.email}
      </a>
    </div>
  );
}
