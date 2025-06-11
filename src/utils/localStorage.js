/**
 * LocalStorage utility functions for task management
 * Provides a clean interface for storing and retrieving tasks
 */

const TASKS_STORAGE_KEY = 'taskManager_tasks';

/**
 * Retrieves all tasks from localStorage
 * @returns {Array} Array of task objects
 */
export const getTasks = () => {
  try {
    const tasks = localStorage.getItem(TASKS_STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error('Error reading tasks from localStorage:', error);
    return [];
  }
};

/**
 * Saves tasks array to localStorage
 * @param {Array} tasks - Array of task objects to save
 */
export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};

/**
 * Generates a unique ID for a new task
 * @returns {string} Unique task ID
 */
export const generateTaskId = () => {
  return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Creates a new task object with default properties
 * @param {string} title - Task title
 * @param {string} description - Task description
 * @returns {Object} New task object
 */
export const createTask = (title, description = '') => {
  return {
    id: generateTaskId(),
    title: title.trim(),
    description: description.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

/**
 * Clears all tasks from localStorage
 */
export const clearAllTasks = () => {
  try {
    localStorage.removeItem(TASKS_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing tasks from localStorage:', error);
  }
};
