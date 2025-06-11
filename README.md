# Task Management Application

A modern, intuitive task management application built with React, Express.js, and a beautiful grayscale theme. This application provides a clean, minimalist interface for managing daily tasks with smooth animations and responsive design.

## 🎯 Project Overview

This task manager focuses on simplicity and user experience, featuring a clean design with ShadCN/UI components, Tailwind CSS styling, and Heroicons for a cohesive visual experience.

## 🛠️ Tech Stack

- **Frontend**: React with Vite
- **Backend**: Express.js API
- **Styling**: Tailwind CSS v4 + ShadCN/UI
- **Icons**: Heroicons
- **Data Persistence**: LocalStorage
- **Development**: Modern React hooks and functional components

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd task-management-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Start the backend server (in a separate terminal)
```bash
npm run server
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # ShadCN/UI components
│   ├── TaskForm.jsx    # Task creation/editing form
│   ├── TaskItem.jsx    # Individual task component
│   ├── TaskList.jsx    # Task list container
│   └── FilterTabs.jsx  # Task filtering tabs
├── hooks/              # Custom React hooks
│   └── useTasks.js     # Task management logic
├── utils/              # Utility functions
│   └── localStorage.js # LocalStorage helpers
├── styles/             # Global styles
└── App.jsx             # Main application component
```

## 🎨 Design Philosophy

This application follows a **human-centered design** approach with:

- **Clean Minimalism**: Uncluttered interface focusing on content
- **Intuitive Interactions**: Natural gestures and familiar patterns
- **Responsive Design**: Seamless experience across all devices
- **Subtle Animations**: Smooth transitions that enhance UX
- **Accessible**: Built with keyboard navigation and screen readers in mind

## 🌈 Color Palette (Grayscale Theme)

- **Primary**: Various shades of gray (50-900)
- **Background**: Clean whites and light grays
- **Text**: Charcoal and dark grays
- **Accents**: Subtle shadows and borders
- **Interactive**: Hover states with gentle transitions

## 📝 Development Notes

- Uses modern React patterns (hooks, functional components)
- Implements proper error boundaries and loading states
- Focuses on component reusability and maintainability
- Includes helpful comments for code clarity
- Follows React best practices and conventions

**Application Features**:
- 📝 Add/edit/delete tasks with title and description
- ✅ Mark tasks as complete/incomplete
- 🔍 Filter tasks by status (all/pending/completed)
- 🔎 Search tasks by title or description
- 💾 Data persistence with localStorage
- 📱 Fully responsive design
- 🎨 Beautiful grayscale theme
- 🚀 Smooth animations and micro-interactions
- 🔔 Toast notifications for all actions
- ⌨️ Keyboard navigation support

---