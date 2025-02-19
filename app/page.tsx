import { Container, Title, Box } from "@mantine/core";
import { TaskTable } from "@/app/components/TaskTable";
import mockTasks from "./utils/mock-data";

export default function Home() {
  return (
    <Container size="xl" py="xl">
      <Box ta="center" mb="lg">
        <Title order={1}>Task Management</Title>
      </Box>
      <TaskTable tasks={mockTasks} />
    </Container>
  );
}
