import { FC, useEffect } from "react";
import { Box, Container } from "@mui/material";
import Typography from '@mui/material/Typography';

import TodoAddingForm from "../todo-adding-form";
import TodoList from "../todo-list";
import { pageLoaded } from "../../effector";

const App: FC = () => {
  useEffect(() => {
    pageLoaded();
  }, []);

  return (
    <Container maxWidth="md">
      <Box minWidth={800}>
        <Typography variant="h1" fontSize={"2.2rem"} fontWeight={700} textAlign={"center"} mb={3}>
          Список задач
        </Typography>
        <TodoAddingForm />
        <TodoList />
      </Box>
    </Container>
  );
};

export default App;
