import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './state/toDoListStore';
import React, { useState } from 'react';
import { actions } from './state/toDoListSlice';
import { TaskComponent } from './taskComponent';
import { createToDo, ToDo } from './state/toDo';
import { getLogger } from '../../logger';
const logger = getLogger('toDoListComponent');

enum AddTaskKind {
  Action,
  ActionWithPrepare,
  CustomActionWithPrepare,
  FromSaga,
}
const addTaskKind: AddTaskKind = AddTaskKind.FromSaga;

export function ToDoListComponent() {
  const tasks = useSelector((state: RootState) => state.toDo.all);
  const dispatch = useDispatch();
  const [taskText, setTaskText] = useState('');

  const onAddToDo = () => {
    switch (addTaskKind) {
      case AddTaskKind.Action:
        dispatch(actions.addToDo(createToDo(taskText)));
        break;
      case AddTaskKind.ActionWithPrepare:
        dispatch(actions.addToDoRaw(taskText));
        break;
      case AddTaskKind.CustomActionWithPrepare:
        dispatch(actions.customAddToDoAction(taskText));
        break;
      case AddTaskKind.FromSaga:
        dispatch(actions.addToDoFromSagaAction(taskText));
        break;
      default:
        logger.error('Unknown addTaskKind');
        break;
    }
    setTaskText('');
  };

  return (
    <div className="container">
      <TaskComponent categoryName="Not finished" tasks={tasks.filter((task) => !task.completed)} />
      <TaskComponent categoryName="Finished" tasks={tasks.filter((task) => task.completed)} />

      <div className="addTaskControls">
        <input type="text" value={taskText} onChange={(e) => setTaskText(e.target.value)} placeholder="Task to do" />
        <button onClick={(e) => onAddToDo()}>Add</button>
      </div>
    </div>
  );
}
