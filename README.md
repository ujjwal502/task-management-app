# Task Manager

A modern, feature-rich task management application built with Next.js that helps users organize and track their tasks efficiently. The application supports both table and Kanban views, with powerful features like undo/redo, custom fields, and real-time filtering.

## Features

### Core Features

- **Task Management (CRUD Operations)**

  - Create, read, update, and delete tasks
  - Rich task properties including title, priority, and status
  - Inline editing and modal-based task management

- **Advanced Filtering & Sorting**

  - Multi-column sorting
  - Text-based search
  - Filter by priority and status
  - Status-aware sorting (Not Started → In Progress → Completed)

- **Pagination**

  - Configurable page size (10/20/50 items)
  - Intuitive navigation controls
  - Current page indicator

- **Data Persistence**

  - Local storage integration
  - State persistence across page reloads
  - Efficient storage management

- **[Custom Fields](docs/CUSTOM_FIELD_MANAGEMENT_README.md)**

  - Dynamic field creation (Text, Number, Checkbox types)
  - Field-specific sorting and filtering
  - Persistence across sessions
  - Schema validation

### Bonus Features Implemented

#### 1. Undo/Redo System

Our robust [undo/redo system](docs/UNDO_REDO_FLOW_README.md) supports:

- Keyboard shortcuts (Ctrl/Cmd + Z for undo, Ctrl/Cmd + Y for redo)
- Up to 50 history states
- Visual feedback through notifications
- Comprehensive action tracking (create, update, delete)

#### 2. Kanban Board View

The [Kanban implementation](docs/KANBAN_FLOW_README.md) offers:

- Priority-based columns (Urgent, High, Medium, Low, None)
- Drag-and-drop task management
- Column-specific sorting and filtering
- Independent column configurations

## Architecture & Design Patterns

### State Management

- Custom `useHistory` hook for undo/redo functionality
- Local state management using React hooks
- Efficient state updates with optimized renders

### Component Architecture

- Container/Presentation pattern for separation of concerns
- Reusable components with clear interfaces
- Modular CSS with scoped styling

### Data Flow

- Unidirectional data flow
- Event-driven architecture for user interactions
- Optimized rendering with React.memo and useMemo

## 🛠 Technical Stack

- **Framework**: Next.js 15.1.7
- **UI Components**: Mantine UI v7.16
- **Styling**: CSS Modules + PostCSS
- **State Management**: React Hooks + Custom Hooks
- **Notifications**: Mantine Notifications
- **Icons**: Tabler Icons

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
or
yarn install
or
pnpm install
```

3. Run the development server:

```bash
npm run dev
or
yarn dev
or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Design Decisions & Assumptions

### Design Decisions

1. **Hybrid View System**: Implemented both table and Kanban views to accommodate different user preferences and workflows

2. **Local Storage**: Chose browser local storage for data persistence

3. **Custom Fields Implementation**: Built a flexible schema system that:
   - Maintains backward compatibility
   - Supports different data types
   - Preserves existing task data

### Assumptions

1. **Browser Support**: Optimized for modern browsers with local storage support
2. **Data Volume**: Designed to handle hundreds of tasks efficiently in the browser
3. **User Preferences**: Users prefer immediate feedback and quick interactions

## 📖 References & Documentation

- [Kanban Board Implementation Guide](docs/KANBAN_FLOW_README.md)
- [Undo/Redo System Documentation](docs/UNDO_REDO_FLOW_README.md)
- [Custom Fields Management Guide](docs/CUSTOM_FIELD_MANAGEMENT_README.md)
- [Mantine UI](https://mantine.dev/)
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [React Tabler icons](https://tabler.io/icons)
