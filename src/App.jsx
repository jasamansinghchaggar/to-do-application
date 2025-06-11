import React from 'react';
import { useTasks } from './hooks/useTasks';
import { ToastProvider, useToast } from './components/ui/Toast';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterTabs from './components/FilterTabs';
import SearchBar from './components/SearchBar';
import { Button } from './components/ui/Button';
import { TrashIcon } from '@heroicons/react/24/outline';

/**
 * Main Application Component
 * A modern, intuitive task management application
 */
function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

/**
 * App Content with toast functionality
 */
function AppContent() {
  const {
    tasks,
    allTasks,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    taskCounts,
    isLoading,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    clearCompleted
  } = useTasks();

  const toast = useToast();

  // Enhanced task operations with toast notifications
  const handleAddTask = (title, description) => {
    addTask(title, description);
    toast.success('Task added', `"${title}" has been added to your tasks.`);
  };

  const handleToggleTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId) || allTasks.find(t => t.id === taskId);
    if (task) {
      toggleTask(taskId);
      toast.info(
        task.completed ? 'Task marked as pending' : 'Task completed',
        `"${task.title}" has been ${task.completed ? 'reopened' : 'completed'}.`
      );
    }
  };

  const handleDeleteTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId) || allTasks.find(t => t.id === taskId);
    if (task) {
      deleteTask(taskId);
      toast.info('Task deleted', `"${task.title}" has been removed.`);
    }
  };

  const handleUpdateTask = (taskId, updates) => {
    updateTask(taskId, updates);
    toast.success('Task updated', 'Your changes have been saved.');
  };

  const handleClearCompleted = () => {
    const completedCount = taskCounts.completed;
    clearCompleted();
    toast.success(
      'Completed tasks cleared',
      `${completedCount} completed task${completedCount !== 1 ? 's' : ''} removed.`
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600">
            Stay organized and focused on what matters most
          </p>
        </header>

        {/* Task Form */}
        <TaskForm onAddTask={handleAddTask} />

        {/* Filter Tabs */}
        <FilterTabs
          activeFilter={filter}
          onFilterChange={setFilter}
          taskCounts={taskCounts}
        />

        {/* Search Bar */}
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onClearSearch={() => setSearchTerm('')}
        />

        {/* Task List */}
        <TaskList
          tasks={tasks}
          filter={filter}
          searchTerm={searchTerm}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onUpdate={handleUpdateTask}
        />

        {/* Clear Completed Button */}
        {taskCounts.completed > 0 && (
          <div className="mt-6 text-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearCompleted}
              className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
            >
              <TrashIcon className="h-4 w-4 mr-2" />
              Clear {taskCounts.completed} completed task{taskCounts.completed !== 1 ? 's' : ''}
            </Button>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>Built by Jasaman Singh</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
