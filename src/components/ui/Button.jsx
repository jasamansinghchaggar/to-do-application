import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Button component with variants and sizes
 * Follows ShadCN/UI design patterns with grayscale theme
 */
const Button = React.forwardRef(({ 
  className, 
  variant = 'default', 
  size = 'default', 
  children,
  ...props 
}, ref) => {
  const baseStyles = [
    'inline-flex items-center justify-center',
    'rounded-md text-sm font-medium',
    'ring-offset-white transition-colors',
    'focus-visible:outline-none focus-visible:ring-2',
    'focus-visible:ring-gray-400 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50'
  ];

  const variants = {
    default: [
      'bg-gray-900 text-white',
      'hover:bg-gray-800',
      'active:bg-gray-700'
    ],
    outline: [
      'border border-gray-300 bg-white text-gray-900',
      'hover:bg-gray-50 hover:border-gray-400',
      'active:bg-gray-100'
    ],
    ghost: [
      'text-gray-900',
      'hover:bg-gray-100',
      'active:bg-gray-200'
    ],
    destructive: [
      'bg-red-600 text-white',
      'hover:bg-red-700',
      'active:bg-red-800'
    ]
  };

  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3 text-xs',
    lg: 'h-11 px-8',
    icon: 'h-10 w-10'
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
