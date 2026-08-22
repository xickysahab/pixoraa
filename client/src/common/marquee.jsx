import './marquee.css';

/**
 * Seamless CSS marquee. Children are rendered twice; the track
 * translates exactly -50%, so the loop has no visible seam.
 */
export default function Marquee({
  children,
  speed = 30,
  reverse = false,
  className = '',
}) {
  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div
        className={`marquee__track ${reverse ? 'marquee__track--rev' : ''}`}
        style={{ '--marquee-speed': `${speed}s` }}
      >
        <div className="marquee__group">{children}</div>
        <div className="marquee__group">{children}</div>
      </div>
    </div>
  );
}
