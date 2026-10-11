// Uses styled-jsx (below) for the `backgroundColor` override, which only
// works in a Client Component — so this needs the directive even though
// the component itself has no other client-only behavior.
'use client';

import type { CSSProperties, ReactNode } from 'react';

import './button.css';

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Optional icon rendered next to the label (decorative — the label already carries the meaning) */
  icon?: ReactNode;
  /** Which side of the label the icon sits on */
  iconPosition?: 'left' | 'right';
  disabled?: boolean;
  /** Stretch to the width of its container instead of sizing to the label */
  fullWidth?: boolean;
  /** Extra classes merged onto the button */
  className?: string;
  /** Inline style overrides (radius, height, colors, ...) for one-off treatments */
  style?: CSSProperties;
  title?: string;
}

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  style,
  ...props
}: ButtonProps) => {
  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  const width = fullWidth ? 'storybook-button--full-width' : '';
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode, width, className].join(' ').trim()}
      style={style}
      {...props}
    >
      {icon && iconPosition === 'left' && (
        <span aria-hidden className="storybook-button__icon">
          {icon}
        </span>
      )}
      {label}
      {icon && iconPosition === 'right' && (
        <span aria-hidden className="storybook-button__icon">
          {icon}
        </span>
      )}
      <style jsx>{`
        button {
          background-color: ${backgroundColor};
          display: inline-flex;
          align-items: center;
          gap: 0.5em;
        }
      `}</style>
    </button>
  );
};
