"use client";

import { Task } from "@/app/shared/types/task";
import { TaskPriority, TaskStatus } from "@/app/shared/types/enums";
import { DragEvent, useState, useEffect } from "react";
import type { KanbanBoardProps, ColumnConfig } from "./KanbanBoard.types";
import { KanbanBoardPresentation } from "./KanbanBoard.presentation";

const PRIORITY_COLUMNS: TaskPriority[] = [
  TaskPriority.URGENT,
  TaskPriority.HIGH,
  TaskPriority.MEDIUM,
  TaskPriority.LOW,
  TaskPriority.NONE,
];

// These are the options users can select from when filtering tasks by status
// I'm using human-readable labels for the UI while keeping enum values for the backend
const STATUS_OPTIONS = [
  { value: TaskStatus.NOT_STARTED, label: "Not Started" },
  { value: TaskStatus.IN_PROGRESS, label: "In Progress" },
  { value: TaskStatus.COMPLETED, label: "Completed" },
];

export function KanbanBoardContainer({
  tasks,
  onTaskCreate,
  onTaskUpdate,
  onTaskDelete,
  isLoading = false,
}: KanbanBoardProps) {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  // Each column needs its own configuration for sorting and filtering
  // I'm using a Record to map each priority to its config, making it easy to look up
  const [columnConfigs, setColumnConfigs] = useState<
    Record<TaskPriority, ColumnConfig>
  >(() => {
    const configs: Record<TaskPriority, ColumnConfig> = {} as Record<
      TaskPriority,
      ColumnConfig
    >;
    PRIORITY_COLUMNS.forEach((priority) => {
      configs[priority] = {
        sortBy: undefined,
        sortDirection: "asc",
        filters: { status: [], search: "" },
      };
    });
    return configs;
  });

  // I need to maintain the manual ordering of tasks within each column
  // This is an array of task IDs for each priority column
  // When users drag tasks around, I update this order
  const [columnOrder, setColumnOrder] = useState<
    Record<TaskPriority, number[]>
  >(() => {
    const order: Record<TaskPriority, number[]> = {} as Record<
      TaskPriority,
      number[]
    >;
    PRIORITY_COLUMNS.forEach((priority) => {
      order[priority] = tasks
        .filter((task) => task.priority === priority)
        .map((task) => task.id);
    });
    return order;
  });

  // When tasks change (create/update/delete), I need to sync the column order
  // This ensures we don't have stale task IDs and new tasks are added correctly
  useEffect(() => {
    setColumnOrder((prev) => {
      const newOrder = { ...prev };
      PRIORITY_COLUMNS.forEach((priority) => {
        const existingIds = new Set(newOrder[priority]);
        const currentTasks = tasks
          .filter((task) => task.priority === priority)
          .map((task) => task.id);

        newOrder[priority] = [
          // Keep existing tasks that are still present
          ...newOrder[priority].filter((id) =>
            tasks.some((task) => task.id === id)
          ),
          // Add any new tasks that weren't in the order before
          ...currentTasks.filter((id) => !existingIds.has(id)),
        ];
      });
      return newOrder;
    });
  }, [tasks]);

  // When a user starts dragging, I store the task and set up the drag event
  const handleDragStart = (e: DragEvent<HTMLDivElement>, task: Task) => {
    setDraggedTask(task);
    e.dataTransfer.setData("text/plain", task.id.toString());
  };

  // This is where the magic of drag-and-drop happens
  // I need to update both the task's priority and its position in the new column
  const handleDrop = (
    e: DragEvent<HTMLDivElement>,
    priority: TaskPriority,
    index?: number
  ) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = "";

    if (!draggedTask) return;

    const updatedTask = { ...draggedTask, priority };
    const sourceColumn = columnOrder[draggedTask.priority];
    const targetColumn = columnOrder[priority];

    const newSourceColumn = sourceColumn.filter((id) => id !== draggedTask.id);
    const newTargetColumn = [...targetColumn];

    if (typeof index === "number") {
      newTargetColumn.splice(index, 0, draggedTask.id);
    } else {
      newTargetColumn.push(draggedTask.id);
    }

    setColumnOrder({
      ...columnOrder,
      [draggedTask.priority]: newSourceColumn,
      [priority]: newTargetColumn,
    });

    onTaskUpdate(updatedTask);
    setDraggedTask(null);
  };

  // I'm implementing a toggle sort - clicking the same field twice reverses the direction
  const handleColumnSort = (priority: TaskPriority, field: string | null) => {
    if (!field) return;

    setColumnConfigs((prev) => {
      const currentConfig = prev[priority];
      const newDirection =
        currentConfig.sortBy === field && currentConfig.sortDirection === "asc"
          ? "desc"
          : "asc";

      return {
        ...prev,
        [priority]: {
          ...currentConfig,
          sortBy: field,
          sortDirection: newDirection,
        },
      };
    });
  };

  // Users can filter tasks in each column independently
  // I support both status-based filtering and text search
  const handleColumnFilter = (
    priority: TaskPriority,
    type: "status" | "search",
    value: string[] | string
  ) => {
    setColumnConfigs((prev) => ({
      ...prev,
      [priority]: {
        ...prev[priority],
        filters: {
          ...prev[priority].filters,
          [type]: value,
        },
      },
    }));
  };

  // This is where I combine sorting, filtering, and manual ordering
  // The order of operations is important: filter first, then sort
  const getFilteredAndSortedTasks = (priority: TaskPriority) => {
    const config = columnConfigs[priority];
    const columnTasks = tasks.filter((task) => task.priority === priority);

    // First, I apply any active filters
    let filtered = columnTasks;
    if (config.filters?.status?.length) {
      filtered = filtered.filter((task) =>
        config.filters?.status?.includes(task.status)
      );
    }
    if (config.filters?.search) {
      // Case-insensitive search in task titles
      filtered = filtered.filter((task) =>
        task.title
          .toLowerCase()
          .includes(config.filters?.search?.toLowerCase() ?? "")
      );
    }

    // Then I either apply the selected sort or use the manual drag-and-drop order
    if (config.sortBy) {
      filtered.sort((a, b) => {
        const aValue = String(a[config.sortBy as keyof Task]);
        const bValue = String(b[config.sortBy as keyof Task]);
        return config.sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      });
    } else {
      // If no sort is selected, I respect the manual ordering from drag-and-drop
      filtered.sort((a, b) => {
        const aIndex = columnOrder[priority].indexOf(a.id);
        const bIndex = columnOrder[priority].indexOf(b.id);
        return aIndex - bIndex;
      });
    }

    return filtered;
  };

  // When creating a new task in a column, I set some sensible defaults
  const handleCreateTask = (priority: TaskPriority) => {
    onTaskCreate({
      title: "New Task",
      priority,
      status: TaskStatus.NOT_STARTED, // Always start in "not started" state
    });
  };

  return (
    <KanbanBoardPresentation
      priorityColumns={PRIORITY_COLUMNS}
      statusOptions={STATUS_OPTIONS}
      columnConfigs={columnConfigs}
      isLoading={isLoading}
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onColumnSort={handleColumnSort}
      onColumnFilter={handleColumnFilter}
      onCreateTask={handleCreateTask}
      onDeleteTask={onTaskDelete}
      getFilteredAndSortedTasks={getFilteredAndSortedTasks}
    />
  );
}
