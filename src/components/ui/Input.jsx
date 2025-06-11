import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Input component for forms
 * Clean, accessible input with focus states
 */
const Input = React.forwardRef(({ 
  className, 
  type = 'text',
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2',
        'text-sm text-gray-900 placeholder:text-gray-500',
        'ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'hover:border-gray-400 transition-colors',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

export { Input };
