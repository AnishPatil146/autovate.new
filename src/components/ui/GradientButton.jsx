import { Link } from 'react-router-dom';

/**
 * GradientButton — Glowing gradient-border button.
 *
 * Design:
 *   Outer wrapper  → 3px gradient border (cyan → pink)
 *   Inner element  → dark background (#000)
 *   ::before       → blurred glow on hover (same gradient)
 *
 * Props:
 *   children / label  — button text / content
 *   onClick           — click handler
 *   href              — external URL  → renders <a>
 *   to                — internal path → renders React Router <Link>
 *   type              — 'button' | 'submit' | 'reset'  (default 'button')
 *   disabled          — boolean
 *   className         — extra classes on the wrapper
 *   size              — 'sm' | 'md' (default) | 'lg'
 *   fullWidth         — boolean, makes wrapper w-full
 *   icon              — React node before label
 *   iconRight         — React node after label
 *   target / rel      — anchor attributes
 *   id                — HTML id on the inner element
 *   animated          — kept for API compatibility (no-op)
 *   variant           — kept for API compatibility (no-op)
 */
export default function GradientButton({
  children,
  label,
  onClick,
  href,
  to,
  type = 'button',
  disabled = false,
  className = '',
  size = 'md',
  fullWidth = false,
  icon,
  iconRight,
  target,
  rel,
  id,
  // kept for backward-compat, unused in this design:
  animated,
  variant,
  ...rest
}) {
  const content = label ?? children;

  /* ── Size map (inner button padding + font) ── */
  const sizeClass = {
    sm: 'gb-sm',
    md: 'gb-md',
    lg: 'gb-lg',
  }[size] ?? 'gb-md';

  /* ── Inner content ── */
  const inner = (
    <>
      {icon      && <span className="gb-icon">{icon}</span>}
      {content}
      {iconRight && <span className="gb-icon">{iconRight}</span>}
    </>
  );

  /* ── Inner element classes ── */
  const innerClass = `gb-inner ${sizeClass}`;

  /* ── Wrapper classes ── */
  const wrapperClass = [
    'gb-wrap',
    fullWidth ? 'gb-full' : '',
    disabled  ? 'gb-disabled' : '',
    className,
  ].filter(Boolean).join(' ');

  /* ── Render inner as the right element type ── */
  let innerEl;
  if (href) {
    innerEl = (
      <a
        href={href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        id={id}
        className={innerClass}
        {...rest}
      >
        {inner}
      </a>
    );
  } else if (to) {
    innerEl = (
      <Link
        to={to}
        id={id}
        className={innerClass}
        onClick={!disabled ? onClick : undefined}
        {...rest}
      >
        {inner}
      </Link>
    );
  } else {
    innerEl = (
      <button
        type={type}
        onClick={!disabled ? onClick : undefined}
        disabled={disabled}
        id={id}
        className={innerClass}
        {...rest}
      >
        {inner}
      </button>
    );
  }

  return (
    <div className={wrapperClass}>
      {innerEl}
    </div>
  );
}
