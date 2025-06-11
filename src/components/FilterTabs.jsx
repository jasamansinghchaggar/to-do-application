import React from 'react';
import { Badge } from './ui/Badge';
import { cn } from '../utils/cn';

/**
 * FilterTabs component for task filtering
 * Clean tab interface with task counts
 */
const FilterTabs = ({ activeFilter, onFilterChange, taskCounts }) => {
  const filters = [
    { key: 'all', label: 'All Tasks', count: taskCounts.all },
    { key: 'pending', label: 'Pending', count: taskCounts.pending },
    { key: 'completed', label: 'Completed', count: taskCounts.completed }
  ];

  return (
    <div className="flex items-center space-x-1 mb-6 p-1 bg-gray-100 rounded-lg">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={cn(
            'flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium',
            'transition-all duration-200',
            activeFilter === filter.key
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          )}
        >
          <span>{filter.label}</span>
          <Badge 
            variant={activeFilter === filter.key ? 'default' : 'secondary'}
            className="text-xs"
          >
            {filter.count}
          </Badge>
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
