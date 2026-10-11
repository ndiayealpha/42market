import { forwardRef, type InputHTMLAttributes } from "react";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Box side length in px. Defaults to 16 (login); signup uses 14. */
  size?: number;
}

/**
 * Custom-styled checkbox: a visually hidden native input (state + a11y)
 * plus a styled sibling box, toggled with `peer-checked`. The checkmark
 * is always rendered in white — invisible on the unchecked white box,
 * visible once the box turns brown — so no opacity toggle is needed.
 * Forwards its ref to the native input for React Hook Form's `register()`
 * / `Controller`.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className = "", size = 16, style, ...props },
  ref
) {
  const boxStyle = { width: size, height: size, ...style };

  return (
    <span className={`relative inline-flex shrink-0 ${className}`} style={boxStyle}>
      <input
        ref={ref}
        type="checkbox"
        className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none opacity-0"
        {...props}
      />
      <span
        aria-hidden
        className="pointer-events-none flex h-full w-full items-center justify-center rounded-[3px] border border-foreground bg-white peer-checked:bg-foreground peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-info"
      >
        <svg width="60%" height="50%" viewBox="0 0 10 8" fill="none">
          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </span>
  );
});
