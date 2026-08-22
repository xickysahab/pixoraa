import { site } from '../../data/site';

export default function Logo() {
  return (
    <a href="#top" className="logo" aria-label={`${site.name} — home`}>
      <span className="logo__mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
          <path
            d="M4 20V4h7a5 5 0 0 1 0 10H8"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="square"
          />
        </svg>
      </span>
      <span className="logo__word">
        Pixoraa<span className="logo__dim"> Digital©</span>
      </span>
    </a>
  );
}
