import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Checkbox component with clean styling
 * Accessible checkbox with proper focus states
 */
const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <input
    type="checkbox"
    ref={ref}
    className={cn(
      'h-4 w-4 rounded border-gray-300 text-gray-900',
      'focus:ring-2 focus:ring-gray-400 focus:ring-offset-2',
      'transition-colors cursor-pointer',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  />
));

Checkbox.displayName = 'Checkbox';

export { Checkbox };
