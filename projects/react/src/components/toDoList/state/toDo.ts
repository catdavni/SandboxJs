export interface ToDo {
  id: string;
  task: string;
  completed: boolean;
}

export function createToDo(task: string): ToDo {
  return {
    id: crypto.randomUUID(),
    task,
    completed: false,
  };
}
