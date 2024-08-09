import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

const initialValue = {
  all: [] as ToDo[],
};

const toDoListSlice = createSlice({
  name: 'toDoList',
  initialState: initialValue,
  reducers: {
    addToDo: (state, action: PayloadAction<ToDo>) => {
      state.all.push(action.payload);
    },
    toggleToDo: (state, { payload }: PayloadAction<ToDo>) => {
      const index = state.all.findIndex((toDo) => toDo.id === payload.id);
      if (index !== -1) {
        const task = state.all[index];
        state.all[index] = { ...task, completed: !task.completed };
      }
    },
  },
});

export const { addToDo, toggleToDo } = toDoListSlice.actions;
export default toDoListSlice.reducer;
