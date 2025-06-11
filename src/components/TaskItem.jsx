import React, { useState } from 'react';
import { 
  CheckIcon, 
  TrashIcon, 
  PencilIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Badge } from './ui/Badge';
import { cn } from '../utils/cn';

/**
 * TaskItem component for displaying individual tasks
 * Supports inline editing, completion toggle, and deletion
 */
const TaskItem = ({ task, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);

  const handleSave = () => {
    if (!editTitle.trim()) return;
    
    onUpdate(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim()
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  if (isEditing) {
    return (
      <Card className="animate-fade-in">
        <CardContent className="p-4">
          <div className="space-y-3">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Task title..."
              className="font-medium"
              autoFocus
            />
            <Textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Task description..."
              rows={3}
              className="resize-none"
            />
            <div className="flex items-center justify-end space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
              >
                <XMarkIcon className="h-4 w-4 mr-1" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                disabled={!editTitle.trim()}
              >
                <CheckIcon className="h-4 w-4 mr-1" />
                Save
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-md transition-shadow animate-slide-up">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          {/* Completion Checkbox */}
          <button
            onClick={() => onToggle(task.id)}
            className={cn(
              'mt-1 h-5 w-5 rounded-full border-2 flex items-center justify-center',
              'transition-all duration-200 hover:scale-110',
              task.completed
                ? 'bg-gray-900 border-gray-900 text-white'
                : 'border-gray-300 hover:border-gray-400'
            )}
          >
            {task.completed && (
              <CheckIcon className="h-3 w-3" strokeWidth={3} />
            )}
          </button>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className={cn(
                  'text-sm font-medium text-gray-900 mb-1',
                  task.completed && 'line-through text-gray-500'
                )}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={cn(
                    'text-sm text-gray-600 mb-2',
                    task.completed && 'line-through text-gray-400'
                  )}>
                    {task.description}
                  </p>
                )}
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={task.completed ? 'success' : 'secondary'}
                    className="text-xs"
                  >
                    {task.completed ? 'Completed' : 'Pending'}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    Created {formatDate(task.createdAt)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                  className="h-8 w-8"
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(task.id)}
                  className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskItem;
