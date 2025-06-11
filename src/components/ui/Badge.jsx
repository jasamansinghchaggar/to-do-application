import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Badge component for status indicators
 * Clean, minimal badges with different variants
 */
const Badge = React.forwardRef(({ className, variant = 'default', ...props }, ref) => {
  const variants = {
    default: 'bg-gray-900 text-white hover:bg-gray-800',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    outline: 'text-gray-900 border border-gray-300 hover:bg-gray-100',
    success: 'bg-green-100 text-green-800 hover:bg-green-200',
    warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
    destructive: 'bg-red-100 text-red-800 hover:bg-red-200'
  };

  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        'transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2',
        variants[variant],
        className
      )}
      {...props}
    />
  );
});

Badge.displayName = 'Badge';

export { Badge };
