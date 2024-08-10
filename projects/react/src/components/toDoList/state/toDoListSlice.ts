import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { getLogger } from '../../../logger';
import { createToDo, ToDo } from './toDo';

const logger = getLogger('Slice');

const initialValue = {
  all: [] as ToDo[],
};

const addToDoFromSagaAction = createAction('addToDoFromSagaAction', (task: string) => {
  logger.info('addToDoFromSagaAction prepare called');
  if (task === '') {
    return {
      error: 'Task cannot be empty',
      payload: null as unknown as ToDo,
    };
  }
  return {
    payload: createToDo(task),
  };
});

const customAddToDoAction = createAction('customAddToDoAction', (task: string) => {
  logger.info('customAddToDoAction prepare called');
  if (task === '') {
    return {
      error: 'Task cannot be empty',
      payload: null as unknown as ToDo,
    };
  }
  return {
    payload: createToDo(task),
  };
});

const toDoListSlice = createSlice({
  name: 'toDoList',
  initialState: initialValue,
  reducers: {
    // action with prepare
    addToDoRaw: {
      prepare: (task: string) => {
        logger.info('addToDoRaw prepare called');
        if (task === '') {
          return {
            error: 'Task cannot be empty',
            payload: null as unknown as ToDo,
          };
        }
        return {
          payload: createToDo(task),
        };
      },
      reducer: (state, action: PayloadAction<ToDo, never, never, string> | PayloadAction<ToDo>) => {
        logger.info('addToDoRaw reducer called');
        if ('error' in action) {
          logger.error(action.error);
          return;
        }
        state.all.push(action.payload);
      },
    },

    addToDo: (state, action: PayloadAction<ToDo>) => {
      logger.info('addToDo reducer called');
      state.all.push(action.payload);
    },

    toggleToDo: (state, { payload }: PayloadAction<ToDo>) => {
      const index = state.all.findIndex((toDo) => toDo.id === payload.id);
      if (index !== -1) {
        const task = state.all[index];
        state.all[index] = {
          ...task,
          completed: !task.completed,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(customAddToDoAction, (state, action) => {
      logger.info('customAddToDoAction reducer called');
      if ('error' in action) {
        logger.error(action.error as string);
        return;
      }
      state.all.push(action.payload);
    });
  },
});

export const actions = { ...toDoListSlice.actions, customAddToDoAction, addToDoFromSagaAction };
export default toDoListSlice.reducer;
