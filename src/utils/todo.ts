import { Priority, PriorityJSON, PriorityValue } from "../types/todos";

export function getPriorityFromJSON(priority: PriorityJSON): Priority {
  const valueMap: { [key: string]: PriorityValue } = {
    высокий: PriorityValue.HIGH,
    низкий: PriorityValue.LOW,
  };

  return {
    ...priority,
    value: valueMap[priority.value.toLowerCase()],
  };
}
