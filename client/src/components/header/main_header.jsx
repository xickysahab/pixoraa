import { useEffect, useRef, useState } from 'react';
import Logo from './logo';
import NavLinks from './nav_links';
import LocationTag from './location_tag';
import MenuButton from './menu_button';
import MobileMenu from './mobile_menu';
import Button from '../../common/button';
import './header.css';

/**
 * Composes the whole header. This is the only header file App.jsx imports.
 * Adds a frosted backdrop once the page has scrolled past the fold edge.
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    function onScroll() {
      setStuck(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>

      <header className={`header ${stuck ? 'header--stuck' : ''}`}>
        <div className="header__inner">
          <div className="header__left">
            <Logo />
            <LocationTag />
          </div>

          <div className="header__center">
            <NavLinks />
          </div>

          <div className="header__right">
            <Button href="#contact" variant="ghost" className="header__cta">
              Start a project
            </Button>
            <span ref={triggerRef} className="header__burger">
              <MenuButton open={open} onToggle={() => setOpen((v) => !v)} />
            </span>
          </div>
        </div>
      </header>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        triggerRef={triggerRef}
      />
    </>
  );
}
