"use client";

import { Container, Title, Box, Skeleton } from "@mantine/core";
import { TaskTable } from "@/app/components/TaskTable";
import { useEffect, useState } from "react";
import { tasksStorage } from "@/app/shared/utils/tasks-storage";
import { Task } from "@/app/shared/types/task";

interface TaskManagerContainerProps {
  initialTasks: Task[];
}

export function TaskManagerContainer({
  initialTasks,
}: TaskManagerContainerProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedTasks = tasksStorage.getTasks();
    setTasks(storedTasks.length > 0 ? storedTasks : initialTasks);
    setIsLoading(false);
  }, [initialTasks]);

  return (
    <Container size="xl" py="xl">
      <Box ta="center" mb="lg">
        <Title order={1}>Task Management</Title>
      </Box>
      {isLoading ? (
        <>
          <Skeleton height={40} radius="sm" mb="md" />
          <Skeleton height={400} radius="sm" />
        </>
      ) : (
        <TaskTable tasks={tasks} />
      )}
    </Container>
  );
}
