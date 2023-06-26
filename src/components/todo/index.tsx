import { FC, ChangeEventHandler, MouseEventHandler } from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { green } from '@material-ui/core/colors';

import { Todo } from "../../types/todos";
import { todoDeleted, todoUpdated } from "../../effector";
import { capitalizeFirstLetter } from "../../utils";

interface TodoProps {
  data: Todo;
}

const TodoItem: FC<TodoProps> = ({ data }) => {
  const { title, isDone } = data;

  const changeTodoStatus: ChangeEventHandler<HTMLInputElement> = () => {
    todoUpdated({
      ...data,
      isDone: !data.isDone,
    });
  };

  const deleteTodo: MouseEventHandler<HTMLButtonElement> = () => {
    todoDeleted(data);
  };

  return (
    <ListItem
      divider={ !isDone }
      sx={{ bgcolor: isDone ? green[100] : "transparent" }}
    >
      <Checkbox
        aria-label="Статус задачи"
        checked={isDone}
        onChange={changeTodoStatus}
        color="success"
      />

      <ListItemText>{capitalizeFirstLetter(title)}</ListItemText>

      <IconButton aria-label="удалить" onClick={deleteTodo}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default TodoItem;
