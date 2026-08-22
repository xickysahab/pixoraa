import Magnetic from './magnetic';
import './button.css';

/**
 * variant: 'solid' | 'ghost' | 'text'
 * Renders an <a> when href is given, otherwise a <button>.
 */
export default function Button({
  children,
  href,
  variant = 'solid',
  arrow = true,
  className = '',
  ...rest
}) {
  const Tag = href ? 'a' : 'button';

  return (
    <Magnetic strength={0.25}>
      <Tag
        href={href}
        className={`btn btn--${variant} ${className}`}
        {...rest}
      >
        <span className="btn__label">{children}</span>
        {arrow && (
          <span className="btn__arrow" aria-hidden="true">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
              <path
                d="M3 13L13 3M13 3H5.5M13 3v7.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </Tag>
    </Magnetic>
  );
}
