// In-memory storage for demo purposes
// In a real app, this would be connected to a database
let tasks = [
  {
    id: 'demo_1',
    title: 'Welcome to Task Manager',
    description: 'This is your first task! Click the circle to mark it as complete.',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'demo_2',
    title: 'Try adding a new task',
    description: 'Use the form above to add your own tasks.',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { method, query } = req;
  const { id } = query;

  try {
    switch (method) {
      case 'GET':
        // Get all tasks
        res.status(200).json({
          success: true,
          data: tasks,
          count: tasks.length
        });
        break;

      case 'POST':
        // Create new task
        const { title, description = '' } = req.body;

        if (!title || !title.trim()) {
          return res.status(400).json({
            success: false,
            error: 'Task title is required'
          });
        }

        const newTask = {
          id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          title: title.trim(),
          description: description.trim(),
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        tasks.unshift(newTask);

        res.status(201).json({
          success: true,
          data: newTask,
          message: 'Task created successfully'
        });
        break;

      case 'PUT':
        // Update task
        if (!id) {
          return res.status(400).json({
            success: false,
            error: 'Task ID is required'
          });
        }

        const taskIndex = tasks.findIndex(task => task.id === id);

        if (taskIndex === -1) {
          return res.status(404).json({
            success: false,
            error: 'Task not found'
          });
        }

        tasks[taskIndex] = {
          ...tasks[taskIndex],
          ...req.body,
          updatedAt: new Date().toISOString()
        };

        res.json({
          success: true,
          data: tasks[taskIndex],
          message: 'Task updated successfully'
        });
        break;

      case 'DELETE':
        // Delete task
        if (!id) {
          return res.status(400).json({
            success: false,
            error: 'Task ID is required'
          });
        }

        const deleteIndex = tasks.findIndex(task => task.id === id);

        if (deleteIndex === -1) {
          return res.status(404).json({
            success: false,
            error: 'Task not found'
          });
        }

        const deletedTask = tasks.splice(deleteIndex, 1)[0];

        res.json({
          success: true,
          data: deletedTask,
          message: 'Task deleted successfully'
        });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).json({
          success: false,
          error: `Method ${method} not allowed`
        });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
}
