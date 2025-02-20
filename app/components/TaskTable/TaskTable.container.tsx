"use client";
import { useState, useMemo, useEffect } from "react";
import { Task } from "@/app/shared/types/task";
import { Box, Button, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

import { tasksStorage } from "@/app/shared/utils/tasks-storage";
import { CustomField } from "@/app/shared/types/custom-field";

import { TaskTablePresentation } from "./TaskTable.presentation";
import { CustomFieldsManager } from "../CustomFields";
import styles from "./TaskTable.module.css";
import { TaskForm } from "../TaskForm/TaskForm";
import { TaskTableControls } from "./TaskTableControls";
import { TaskTablePagination } from "./TaskTablePagination";
import { ConfirmationModal } from "../Common/ConfirmationModal/ConfirmationModal";
import { TaskTableContainerProps } from "./TaskTable.types";
import { PRIORITY_ORDER, STATUS_ORDER } from "./TaskTable.utils";

export function TaskTableContainer({
  tasks: initialTasks,
}: TaskTableContainerProps) {
  const [customFields, setCustomFields] = useState<CustomField[]>(() => {
    const savedFields = localStorage.getItem("customFields");
    return savedFields ? JSON.parse(savedFields) : [];
  });

  const [tasks, setTasks] = useState(() => {
    const savedTasks = tasksStorage.getTasks();
    console.log("Loading saved tasks:", savedTasks);
    return savedTasks.length > 0 ? savedTasks : initialTasks;
  });

  useEffect(() => {
    console.log("Saving tasks in effect:", tasks);
    tasksStorage.setTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("customFields", JSON.stringify(customFields));
  }, [customFields]);

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

  const [
    customFieldsModalOpened,
    { open: openCustomFieldsModal, close: closeCustomFieldsModal },
  ] = useDisclosure(false);

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

    const customField = customFields.find((field) => field.id === column);
    const fieldName = customField?.name || column;

    const sortedTasks = [...tasks].sort((a, b) => {
      let aValue: string | number = String(a[column as keyof Task] || "");
      let bValue: string | number = String(b[column as keyof Task] || "");

      if (customField && a.customFields && b.customFields) {
        const aCustom = a.customFields[fieldName];
        const bCustom = b.customFields[fieldName];

        if (customField.type === "number") {
          if (aCustom === undefined && bCustom === undefined) return 0;
          if (aCustom === undefined) return isAsc ? 1 : -1;
          if (bCustom === undefined) return isAsc ? -1 : 1;

          return isAsc
            ? Number(aCustom || 0) - Number(bCustom || 0)
            : Number(bCustom || 0) - Number(aCustom || 0);
        }

        if (customField.type === "checkbox") {
          const aCheck = Boolean(aCustom);
          const bCheck = Boolean(bCustom);
          return isAsc
            ? Number(aCheck) - Number(bCheck)
            : Number(bCheck) - Number(aCheck);
        }

        if (aCustom === undefined && bCustom === undefined) return 0;
        if (aCustom === undefined) return isAsc ? 1 : -1;
        if (bCustom === undefined) return isAsc ? -1 : 1;

        aValue = String(aCustom);
        bValue = String(bCustom);
      }

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

      aValue = String(aValue || "");
      bValue = String(bValue || "");
      return isAsc
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
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

    notifications.show({
      title: "Task Created",
      message: `Task "${task.title}" has been created successfully`,
      color: "green",
      icon: <IconCheck size={16} />,
    });
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

    notifications.show({
      title: "Task Updated",
      message: `Task "${updatedTask.title}" has been updated successfully`,
      color: "blue",
      icon: <IconCheck size={16} />,
    });
  };

  const handleDeleteClick = (taskId: number) => {
    setDeletingTaskId(taskId);
    openDeleteModal();
  };

  const handleConfirmDelete = () => {
    if (deletingTaskId) {
      const taskToDelete = tasks.find((task) => task.id === deletingTaskId);
      setTasks(tasks.filter((task) => task.id !== deletingTaskId));
      setDeletingTaskId(null);
      closeDeleteModal();

      notifications.show({
        title: "Task Deleted",
        message: `Task "${taskToDelete?.title}" has been deleted`,
        color: "red",
        icon: <IconX size={16} />,
      });
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

  const handleAddCustomField = (field: Omit<CustomField, "id">) => {
    const newField: CustomField = {
      ...field,
      id: crypto.randomUUID(),
    };

    const updatedTasks = tasks.map((task) => {
      const defaultValue = () => {
        switch (field.type) {
          case "number":
            return 0;
          case "checkbox":
            return false;
          case "text":
          default:
            return "";
        }
      };

      return {
        ...task,
        customFields: {
          ...task.customFields,
          [newField.name]: defaultValue(),
        },
      };
    });

    console.log("Saving tasks with new custom field:", updatedTasks);
    setTasks(updatedTasks);
    tasksStorage.setTasks(updatedTasks);

    setCustomFields((prev) => [...prev, newField]);

    notifications.show({
      title: "Custom Field Added",
      message: `Custom field "${newField.name}" has been added successfully`,
      color: "green",
      icon: <IconCheck size={16} />,
    });
  };

  const handleRemoveCustomField = (fieldId: string) => {
    const fieldToRemove = customFields.find((field) => field.id === fieldId);
    setCustomFields((prev) => prev.filter((field) => field.id !== fieldId));

    const updatedTasks = tasks.map((task) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [fieldToRemove?.name || ""]: _, ...remainingCustomFields } =
        task.customFields || {};
      return { ...task, customFields: remainingCustomFields };
    });

    setTasks(updatedTasks);
    tasksStorage.setTasks(updatedTasks);

    notifications.show({
      title: "Custom Field Removed",
      message: `Custom field "${fieldToRemove?.name}" has been removed`,
      color: "red",
      icon: <IconX size={16} />,
    });
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
        <Button variant="light" onClick={openCustomFieldsModal}>
          Manage Custom Fields
        </Button>
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
        customFields={customFields}
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
        customFields={customFields}
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

      <CustomFieldsManager
        opened={customFieldsModalOpened}
        onClose={closeCustomFieldsModal}
        customFields={customFields}
        onAddField={handleAddCustomField}
        onRemoveField={handleRemoveCustomField}
      />
    </>
  );
}
