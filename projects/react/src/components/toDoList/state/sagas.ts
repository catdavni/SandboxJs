import { call, put, takeEvery, getContext } from 'redux-saga/effects';
import { actions } from './toDoListSlice';
import { ILogger } from '../../../logger';
import { PayloadAction } from '@reduxjs/toolkit';
import { ToDo } from './toDo';

export function* addToDoRootSaga() {
  yield takeEvery(actions.addToDoFromSagaAction, addToDoSaga);
}

function* addToDoSaga(action: ReturnType<typeof actions.addToDoFromSagaAction>) {
  const logger: ILogger = yield getContext('logger');
  logger.info('addToDoSaga called');
  if ('error' in action) {
    logger.error(action.error as string);
    return;
  }
  logger.info('dispatching adding action to the store');
  // put for store, call for api (not store calls)
  yield put(actions.addToDo(action.payload));
  yield call(someApiCall, action.payload);
}

function* someApiCall(action: ToDo) {
  const logger: ILogger = yield getContext('logger');
  logger.info('someApiCall');
}
