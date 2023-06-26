import { FC } from "react";
import { useUnit } from "effector-react";
import List from '@mui/material/List';
import { Box } from "@mui/material";
import Typography from '@mui/material/Typography';

import { $priorities, $todos } from "../../effector";
import Todo from "../todo";
import { PRIORITY_TITLES } from "../../constants";


const TodoList: FC = () => {
  const priorities = useUnit($priorities);
  const todos = useUnit($todos);

  return (
    <>
    {priorities.map(({ id, value }) => (
      <Box key={id} mt={5}>
        <Typography variant="h3" fontSize={"1.2rem"} fontWeight={700} textAlign={"center"}>
          {PRIORITY_TITLES[value]}
        </Typography>

        <List>
          {todos
            .filter((todo) => todo.priorityId === id)
            .map((todo) => (
              <Todo key={todo.id} data={todo} />
            ))}
        </List>
      </Box>
    ))}
    </>
  );
};

export default TodoList;
