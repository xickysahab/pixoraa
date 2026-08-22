import { navLinks } from '../../data/site';
import useActiveSection from '../../common/use_active_section';

// Stable identity so the hook's effect isn't torn down every render.
const SECTION_IDS = navLinks.map((l) => l.href.slice(1));

/**
 * Desktop nav. Each label swaps to a molten duplicate on hover via a
 * stacked, clipped copy — no layout shift. The link for the section
 * currently on screen stays lit, so the nav reads as a position
 * indicator and not just a set of jump buttons.
 */
export default function NavLinks() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <nav className="nav" aria-label="Primary">
      <ul className="nav__list">
        {navLinks.map((link) => {
          const isActive = active === link.href.slice(1);

          return (
            <li key={link.id}>
              <a
                href={link.href}
                className={`nav__link ${isActive ? 'nav__link--on' : ''}`}
                aria-current={isActive ? 'true' : undefined}
              >
                <span className="nav__swap">
                  <span className="nav__text nav__text--base">{link.label}</span>
                  <span className="nav__text nav__text--alt" aria-hidden="true">
                    {link.label}
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
