import { useState, useEffect, useCallback } from 'react';
import { getTasks, saveTasks, createTask } from '../utils/localStorage';

/**
 * Custom hook for managing tasks
 * Handles all task operations including CRUD and filtering
 */
export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed'
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const loadTasks = () => {
      try {
        const savedTasks = getTasks();
        setTasks(savedTasks);
      } catch (error) {
        console.error('Error loading tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (!isLoading) {
      saveTasks(tasks);
    }
  }, [tasks, isLoading]);

  /**
   * Adds a new task
   * @param {string} title - Task title
   * @param {string} description - Task description
   */
  const addTask = useCallback((title, description = '') => {
    if (!title.trim()) return;

    const newTask = createTask(title, description);
    setTasks(prevTasks => [newTask, ...prevTasks]);
  }, []);

  /**
   * Toggles task completion status
   * @param {string} taskId - ID of task to toggle
   */
  const toggleTask = useCallback((taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              completed: !task.completed,
              updatedAt: new Date().toISOString()
            }
          : task
      )
    );
  }, []);

  /**
   * Deletes a task
   * @param {string} taskId - ID of task to delete
   */
  const deleteTask = useCallback((taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, []);

  /**
   * Updates an existing task
   * @param {string} taskId - ID of task to update
   * @param {Object} updates - Object containing updates
   */
  const updateTask = useCallback((taskId, updates) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId
          ? {
              ...task,
              ...updates,
              updatedAt: new Date().toISOString()
            }
          : task
      )
    );
  }, []);

  /**
   * Clears all completed tasks
   */
  const clearCompleted = useCallback(() => {
    setTasks(prevTasks => prevTasks.filter(task => !task.completed));
  }, []);

  // Filtered tasks based on current filter and search term
  const filteredTasks = tasks.filter(task => {
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const titleMatch = task.title.toLowerCase().includes(searchLower);
      const descriptionMatch = task.description.toLowerCase().includes(searchLower);
      if (!titleMatch && !descriptionMatch) {
        return false;
      }
    }

    // Apply status filter
    switch (filter) {
      case 'pending':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });

  // Task counts for each filter
  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length
  };

  return {
    tasks: filteredTasks,
    allTasks: tasks,
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
  };
};
