/**
 * Standard section shell: id anchor, max-width, gutters, vertical rhythm.
 * Every main_*.jsx renders through this so spacing stays consistent.
 */
export default function SectionWrapper({
  id,
  children,
  className = '',
  label,
}) {
  return (
    <section
      id={id}
      className={`section ${className}`}
      aria-label={label}
    >
      <div className="section__inner">{children}</div>
    </section>
  );
}
