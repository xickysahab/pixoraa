/**
 * One client cell.
 *
 * A fixed-size box with a hairline border and a small registration cross
 * straddling each corner — the drafting-mark detail that makes a client
 * wall read as a spec sheet rather than a list. Corners stay sharp on
 * purpose; rounding them softens exactly the quality this is after.
 *
 * Wordmarks stand in until real logo files land in
 * assets/images/partners — swap `.plogo__name` for an <img> and the box
 * is already the right shape for it.
 */
function CornerMark({ at }) {
  return (
    <svg
      className={`plogo__mark plogo__mark--${at}`}
      width="9"
      height="9"
      viewBox="0 0 9 9"
      fill="none"
      aria-hidden="true"
    >
      <path d="M4.5 0V9M0 4.5H9" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export default function PartnerLogo({ name }) {
  return (
    <span className="plogo">
      <CornerMark at="tl" />
      <CornerMark at="tr" />
      <CornerMark at="bl" />
      <CornerMark at="br" />
      <span className="plogo__name">{name}</span>
    </span>
  );
}
