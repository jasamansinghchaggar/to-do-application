import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Card, CardContent } from './ui/Card';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Button } from './ui/Button';

/**
 * TaskForm component for adding new tasks
 * Clean, accessible form with proper validation
 */
const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    onAddTask(title, description);
    setTitle('');
    setDescription('');
    setIsExpanded(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    // Auto-expand when user starts typing
    if (!isExpanded && e.target.value.length > 0) {
      setIsExpanded(true);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setIsExpanded(false);
  };

  return (
    <Card className="mb-6 animate-fade-in">
      <CardContent className="p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-3">
            <PlusIcon className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <Input
              type="text"
              placeholder="Add a new task..."
              value={title}
              onChange={handleTitleChange}
              className="text-base"
              autoComplete="off"
            />
          </div>

          {isExpanded && (
            <div className="animate-slide-down ml-8 space-y-4">
              <Textarea
                placeholder="Add a description (optional)..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="resize-none"
                rows={3}
              />
              
              <div className="flex items-center justify-end space-x-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={!title.trim()}
                >
                  Add Task
                </Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
