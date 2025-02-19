"use client";

import { Task } from "@/app/types/task";
import { Box, Button, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { TaskTablePresentation } from "./TaskTable.presentation";
import styles from "./TaskTable.module.css";
import { TaskForm } from "../TaskForm/TaskForm";
import { useState, useMemo } from "react";
import { TaskTableControls } from "./TaskTableControls";
import { TaskTablePagination } from "./TaskTablePagination";
import { ConfirmationModal } from "../Common/ConfirmationModal/ConfirmationModal";
import { TaskTableContainerProps } from "./TaskTable.types";
import { PRIORITY_ORDER, STATUS_ORDER } from "./TaskTable.utils";

export function TaskTableContainer({
  tasks: initialTasks,
}: TaskTableContainerProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [opened, { open, close }] = useDisclosure(false);
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [sortColumn, setSortColumn] = useState<string | undefined>();
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesPriority =
        selectedPriorities.length === 0 ||
        selectedPriorities.includes(task.priority);
      const matchesStatus =
        selectedStatuses.length === 0 || selectedStatuses.includes(task.status);

      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [tasks, searchQuery, selectedPriorities, selectedStatuses]);

  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredTasks.slice(startIndex, endIndex);
  }, [filteredTasks, currentPage, pageSize]);

  const handleSort = (column: string) => {
    const isAsc = sortColumn === column && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortColumn(column);

    const sortedTasks = [...tasks].sort((a, b) => {
      const aValue = a[column as keyof Task];
      const bValue = b[column as keyof Task];

      if (column === "priority") {
        const priorityA = PRIORITY_ORDER[aValue as keyof typeof PRIORITY_ORDER];
        const priorityB = PRIORITY_ORDER[bValue as keyof typeof PRIORITY_ORDER];
        return isAsc ? priorityA - priorityB : priorityB - priorityA;
      }

      if (column === "status") {
        const statusA = STATUS_ORDER[aValue as keyof typeof STATUS_ORDER];
        const statusB = STATUS_ORDER[bValue as keyof typeof STATUS_ORDER];
        return isAsc ? statusA - statusB : statusB - statusA;
      }

      if (aValue < bValue) return isAsc ? -1 : 1;
      if (aValue > bValue) return isAsc ? 1 : -1;
      return 0;
    });

    setTasks(sortedTasks);
  };

  const handleCreateTask = (newTask: Omit<Task, "id">) => {
    const task: Task = {
      ...newTask,
      id: Math.max(...tasks.map((t) => t.id), 0) + 1,
    };
    setTasks([...tasks, task]);
    close();
  };

  const handleEditTask = (taskId: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setEditingTask(task);
      open();
    }
  };

  const handleUpdateTask = (updatedTask: Omit<Task, "id">) => {
    if (!editingTask) return;

    setTasks(
      tasks.map((task) =>
        task.id === editingTask.id ? { ...updatedTask, id: task.id } : task
      )
    );
    setEditingTask(null);
    close();
  };

  const handleDeleteClick = (taskId: number) => {
    setDeletingTaskId(taskId);
    openDeleteModal();
  };

  const handleConfirmDelete = () => {
    if (deletingTaskId) {
      setTasks(tasks.filter((task) => task.id !== deletingTaskId));
      setDeletingTaskId(null);
      closeDeleteModal();
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (value: string | null) => {
    if (!value) return;
    const newPageSize = Number(value);
    setPageSize(newPageSize);
    setCurrentPage(1);
  };

  if (!tasks.length) {
    return (
      <Box className={styles.emptyState}>
        <Text size="sm" c="dimmed">
          No tasks found
        </Text>
      </Box>
    );
  }

  return (
    <>
      <Group mb="md" justify="space-between">
        <Button onClick={open}>Create Task</Button>
        <TaskTableControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedPriorities={selectedPriorities}
          onPrioritiesChange={setSelectedPriorities}
          selectedStatuses={selectedStatuses}
          onStatusesChange={setSelectedStatuses}
        />
      </Group>

      <TaskTablePresentation
        tasks={paginatedTasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteClick}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
      />

      <TaskTablePagination
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={filteredTasks.length}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />

      <TaskForm
        opened={opened}
        onClose={() => {
          close();
          setEditingTask(null);
        }}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        initialValues={editingTask ?? undefined}
        title={editingTask ? "Edit Task" : "Create Task"}
      />

      <ConfirmationModal
        opened={deleteModalOpened}
        onClose={() => {
          closeDeleteModal();
          setDeletingTaskId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
      />
    </>
  );
}
