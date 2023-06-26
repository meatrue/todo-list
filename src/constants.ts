import { PriorityValue } from "./types/todos";

export const JSON_SERVER_BASE_URL = "http://localhost:3001";

export const PRIORITY_TITLES = {
  [PriorityValue.HIGH]: "Важные",
  [PriorityValue.LOW]: "Неважные"
};
