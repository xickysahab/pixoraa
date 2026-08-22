import './eyebrow.css';

/**
 * The single section eyebrow used by every section, top to bottom.
 *
 * Set in Instrument Serif italic against a short molten rule. The serif
 * is the deliberate contrast: every section headline is heavy grotesk,
 * so an italic serif above it reads as editorial rather than as another
 * line of UI chrome — which is what the old wide-tracked mono did.
 *
 * No index numbers. They implied a running order the page does not
 * actually have, and dated every section the moment one was reordered.
 */
export default function Eyebrow({ children, className = '' }) {
  return (
    <span className={`eyebrow ${className}`}>
      <span className="eyebrow__rule" aria-hidden="true" />
      <span className="eyebrow__text">{children}</span>
    </span>
  );
}
