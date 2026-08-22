/** Two-bar burger that crosses into an X when open. */
export default function MenuButton({ open, onToggle }) {
  return (
    <button
      type="button"
      className={`burger ${open ? 'burger--open' : ''}`}
      onClick={onToggle}
      aria-expanded={open}
      aria-controls="mobile-menu"
      aria-label={open ? 'Close menu' : 'Open menu'}
    >
      <span className="burger__bar" aria-hidden="true" />
      <span className="burger__bar" aria-hidden="true" />
    </button>
  );
}
