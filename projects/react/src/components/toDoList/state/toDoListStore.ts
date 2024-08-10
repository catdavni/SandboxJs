import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { addToDoRootSaga } from './sagas';
import toDoListSlice from './toDoListSlice';
import { getLogger } from '../../../logger';
import { createToDo } from './toDo';
const logger = getLogger('StoreMiddleware');

const loggingMiddleware = (api: any) => (next: any) => (action: any) => {
  logger.info('Dispatching action:', JSON.stringify(action));
  return next(action);
};

// overrides slice initial state
const initialState = {
  toDo: {
    all: Array.from({ length: 3 }, (_, i) => createToDo(`Task ${i}`)),
  },
};

const sagaMiddleware = createSagaMiddleware({
  context: { logger: getLogger('ReduxSaga') },
});
export const toDoListStore = configureStore({
  preloadedState: initialState,
  reducer: {
    toDo: toDoListSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggingMiddleware).concat(sagaMiddleware),
});

sagaMiddleware.run(addToDoRootSaga);

export type RootState = ReturnType<typeof toDoListStore.getState>;
