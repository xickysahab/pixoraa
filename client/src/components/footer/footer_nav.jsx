import { navLinks } from '../../data/site';

const LEGAL = [
  { id: 'terms', label: 'Terms of Service', href: '#' },
  { id: 'privacy', label: 'Privacy Policy', href: '#' },
];

export default function FooterNav() {
  return (
    <div className="foot__navs">
      <nav aria-label="Footer">
        <p className="label foot__col-label">Menu</p>
        <ul className="foot__list">
          {navLinks.map((l) => (
            <li key={l.id}>
              <a href={l.href} className="foot__link">{l.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <nav aria-label="Legal">
        <p className="label foot__col-label">Legal</p>
        <ul className="foot__list">
          {LEGAL.map((l) => (
            <li key={l.id}>
              <a href={l.href} className="foot__link">{l.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
