import { configureStore } from '@reduxjs/toolkit';

import toDoListSlice, { createToDo } from './toDoListSlice';

const loggingMiddleware = (api: any) => (next: any) => (action: any) => {
  console.log('Dispatching action:', action);
  return next(action);
};

const initialState = {
  toDo: {
    all: Array.from({ length: 5 }, (_, i) => createToDo(`Task ${i}`)),
  },
};

export const toDoListStore = configureStore({
  preloadedState: initialState,
  reducer: {
    toDo: toDoListSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggingMiddleware),
});

export type RootState = ReturnType<typeof toDoListStore.getState>;
