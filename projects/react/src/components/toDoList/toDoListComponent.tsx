import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './state/toDoListStore';
import React, { useState } from 'react';
import { addToDo, ToDo, toggleToDo } from './state/toDoListSlice';
import { TaskComponent } from './taskComponent';

export function ToDoListComponent() {
  const tasks = useSelector((state: RootState) => state.toDo.all);
  const dispatch = useDispatch();

  const [taskText, setTaskText] = useState('');
  const onAddToDo = () => {
    const task: ToDo = {
      id: crypto.randomUUID(),
      task: taskText,
      completed: false,
    };
    dispatch(addToDo(task));
    setTaskText('');
  };

  return (
    <div className="container">
      <TaskComponent
        categoryName="Not finished"
        tasks={tasks.filter((task) => !task.completed)}
      />
      <TaskComponent
        categoryName="Finished"
        tasks={tasks.filter((task) => task.completed)}
      />

      <div className="addTaskControls">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Task to do"
        />
        <button onClick={(e) => onAddToDo()}>Add</button>
      </div>
    </div>
  );
}
