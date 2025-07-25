import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Textarea component for longer text input
 * Matches Input styling for consistency
 */
const Textarea = React.forwardRef(({ 
  className,
  ...props 
}, ref) => {
  return (
    <textarea
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2',
        'text-sm text-gray-900 placeholder:text-gray-500',
        'ring-offset-white',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'hover:border-gray-400 transition-colors',
        'resize-none',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = 'Textarea';

export { Textarea };
