import {
  FC,
  useState,
  ChangeEventHandler,
  FormEventHandler,
} from "react";
import { useUnit } from "effector-react";
import Accordion from '@mui/material/Accordion/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import Typography from '@mui/material/Typography';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {colors} from '@material-ui/core';

import { $error, $priorities, todoAdded } from "../../effector";
import { Todo } from "../../types/todos";
import { capitalizeFirstLetter } from "../../utils";
import { AddButton } from "./add-button";

const TodoAddingForm: FC = () => {
  const priorities = useUnit($priorities);
  const error = useUnit($error);

  const [todoTitle, setTodoTitle] = useState<string>("");
  const [currentPriority, setCurrentPriority] = useState<string>("");


  const changeTodoTitle: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTodoTitle(e.target.value);
  };

  const changePriority = (e: SelectChangeEvent<string>) => {
    setCurrentPriority(e.target.value);
  };

  const resetTodo = (): void => {
    setTodoTitle("");
    setCurrentPriority("");
  };

  const submitTodo: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const newTodo: Todo = {
      id: String(new Date()),
      title: todoTitle,
      priorityId: currentPriority,
      userId: "1",
      isDone: false,
    };

    if (!todoTitle || !currentPriority) return;

    todoAdded(newTodo);
    resetTodo();
  };

  return (
    <Accordion>
      <AccordionSummary aria-controls="add-todo-header" expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h2" fontSize={"1.6rem"} fontWeight={700}>Добавить задачу</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <form onSubmit={submitTodo}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Название задачи"
                onChange={changeTodoTitle}
                value={todoTitle}
              />
            </Grid>

            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="priority-select-label">Приоритет</InputLabel>
                <Select
                  labelId="priority-select-label"
                  id="priority-select"
                  value={currentPriority}
                  label="Приоритет"
                  onChange={changePriority}
                >
                  {priorities.map(({ id, value }) => (
                    <MenuItem key={id} value={id}>
                      {capitalizeFirstLetter(value)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item sm={3}>
              <AddButton
                type="submit"
                disabled={!todoTitle || !currentPriority}
                variant="contained"
                color="success"
                size="large"
                endIcon={<AddOutlinedIcon fontSize={"large"} />}
              >
                Добавить
              </AddButton>
            </Grid>

            {error && 
            <Grid item sm={12}>
              <Typography color={colors.red[500]}>{error}</Typography>
            </Grid>}
          </Grid>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default TodoAddingForm;
