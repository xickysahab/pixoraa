/**
 * `stars` is a number, not a string of glyphs — a text ⭐⭐⭐⭐⭐ run is
 * read aloud five times by a screen reader and cannot be styled.
 */
export default function Stars({ count = 5, of = 5 }) {
  return (
    <span className="tst__stars" role="img" aria-label={`${count} out of ${of}`}>
      {Array.from({ length: of }, (_, i) => (
        <svg
          key={i}
          className={`tst__star ${i < count ? 'tst__star--on' : ''}`}
          viewBox="0 0 16 16"
          width="13"
          height="13"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M8 1.2l2 4.2 4.6.6-3.4 3.2.9 4.6L8 11.6 3.9 13.8l.9-4.6L1.4 6l4.6-.6z"
          />
        </svg>
      ))}
    </span>
  );
}
