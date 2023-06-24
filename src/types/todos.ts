export enum PriorityValue {
  HIGH = "высокий",
  LOW = "низкий",
}

export type PriorityJSON = {
  id: string;
  value: string;
};

export type Priority = Omit<PriorityJSON, "value"> & {
  value: PriorityValue;
};

export type User = {
  id: string;
  name: string;
  password: string;
};

export type Todo = {
  id: string;
  title: string;
  description?: string;
  priorityId: string;
  userId: string;
  isDone: boolean;
};
