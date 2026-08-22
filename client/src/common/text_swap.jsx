import './text_swap.css';

/**
 * The signature label interaction: two stacked copies of the same word.
 * The resting copy folds away from its top edge while the incoming copy
 * unfolds from its bottom edge, so the word appears to flip in place
 * rather than slide past.
 *
 * An invisible copy holds the box so nothing reflows mid-swap.
 * The text is real in the DOM once — the two animated copies are
 * aria-hidden, so a screen reader hears the label a single time.
 */
export default function TextSwap({ children, className = '', as: Tag = 'span' }) {
  return (
    <Tag className={`swap ${className}`}>
      <span className="swap__ghost">{children}</span>
      <span className="swap__face swap__face--out" aria-hidden="true">
        {children}
      </span>
      <span className="swap__face swap__face--in" aria-hidden="true">
        {children}
      </span>
    </Tag>
  );
}
