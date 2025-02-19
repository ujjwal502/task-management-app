"use client";

import { Task } from "@/app/types/task";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Table } from "../Common/Table/Table";
import styles from "./TaskTable.module.css";
import { useMemo } from "react";

interface TaskTablePresentationProps {
  tasks: Task[];
  onEdit: (taskId: number) => void;
  onDelete: (taskId: number) => void;
  sortColumn?: string;
  sortDirection?: "asc" | "desc";
  onSort?: (column: string) => void;
}

export function TaskTablePresentation({
  tasks,
  onEdit,
  onDelete,
  sortColumn,
  sortDirection,
  onSort,
}: TaskTablePresentationProps) {
  const columns = useMemo(
    () => [
      {
        key: "title",
        header: "Title",
        render: (task: Task) => task.title,
        width: "40%",
        sortable: true,
      },
      {
        key: "priority",
        header: "Priority",
        render: (task: Task) => (
          <span className={styles[`priority-${task.priority}`]}>
            {task.priority}
          </span>
        ),
        width: "20%",
        sortable: true,
      },
      {
        key: "status",
        header: "Status",
        render: (task: Task) => (
          <span className={styles[`status-${task.status}`]}>{task.status}</span>
        ),
        width: "20%",
        sortable: true,
      },
      {
        key: "actions",
        header: "Actions",
        render: (task: Task) => (
          <Group gap="xs">
            <Tooltip label="Edit task" position="top">
              <ActionIcon
                variant="subtle"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(task.id);
                }}
                aria-label="Edit task"
              >
                <IconEdit size={16} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Delete task" position="top">
              <ActionIcon
                variant="subtle"
                color="red"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(task.id);
                }}
                aria-label="Delete task"
              >
                <IconTrash size={16} />
              </ActionIcon>
            </Tooltip>
          </Group>
        ),
        width: "20%",
      },
    ],
    [onDelete, onEdit]
  );

  return (
    <Table
      data={tasks}
      columns={columns}
      sortColumn={sortColumn}
      sortDirection={sortDirection}
      onSort={onSort}
    />
  );
}
