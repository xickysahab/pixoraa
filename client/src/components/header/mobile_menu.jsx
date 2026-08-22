import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { navLinks, site, socials } from '../../data/site';
import CloseButton from './close_button';

/**
 * Full-screen overlay menu. Locks body scroll while open, closes on
 * Escape, and returns focus to the trigger on close.
 *
 * It carries its own close button because the overlay stacks above the
 * header and hides the burger that opened it — which left Escape as the
 * only way out, and that is not a way out on a phone.
 */
export default function MobileMenu({ open, onClose, triggerRef }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();

    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
      triggerRef?.current?.focus();
    };
  }, [open, onClose, triggerRef]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          tabIndex={-1}
          className="mmenu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        >
          <CloseButton onClose={onClose} />

          <nav className="mmenu__nav" aria-label="Mobile">
            <ul>
              {navLinks.map((link, i) => (
                <li key={link.id} className="mmenu__item">
                  <motion.a
                    href={link.href}
                    onClick={onClose}
                    className="mmenu__link display"
                    initial={{ y: '105%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '105%', transition: { duration: 0.25 } }}
                    transition={{
                      duration: 0.7,
                      delay: 0.18 + i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mmenu__foot">
            <a href={`mailto:${site.email}`} className="mmenu__email">
              {site.email}
            </a>
            <ul className="mmenu__socials">
              {socials.map((s) => (
                <li key={s.id}>
                  <a href={s.href} target="_blank" rel="noreferrer noopener">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
