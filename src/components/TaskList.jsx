import React from 'react';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import TaskItem from './TaskItem';

/**
 * TaskList component for displaying filtered tasks
 * Handles empty states with clean messaging
 */
const TaskList = ({ tasks, filter, searchTerm, onToggle, onDelete, onUpdate }) => {
  if (tasks.length === 0) {
    return <EmptyState filter={filter} searchTerm={searchTerm} />;
  }

  return (
    <div className="space-y-3">
      {searchTerm && (
        <div className="text-sm text-gray-600 mb-4 animate-fade-in">
          Found {tasks.length} task{tasks.length !== 1 ? 's' : ''} matching "{searchTerm}"
        </div>
      )}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

/**
 * EmptyState component for when no tasks match the filter
 */
const EmptyState = ({ filter, searchTerm }) => {
  const getEmptyMessage = () => {
    if (searchTerm) {
      return {
        title: `No tasks found for "${searchTerm}"`,
        description: 'Try adjusting your search terms or create a new task with this name.'
      };
    }

    switch (filter) {
      case 'pending':
        return {
          title: 'No pending tasks',
          description: 'Great job! You\'ve completed all your tasks.'
        };
      case 'completed':
        return {
          title: 'No completed tasks yet',
          description: 'Complete some tasks to see them here.'
        };
      default:
        return {
          title: 'No tasks yet',
          description: 'Add your first task to get started with organizing your day.'
        };
    }
  };

  const { title, description } = getEmptyMessage();

  return (
    <div className="text-center py-12 animate-fade-in">
      <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <ClipboardDocumentListIcon className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 max-w-sm mx-auto">{description}</p>
    </div>
  );
};

export default TaskList;
