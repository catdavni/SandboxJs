import React from 'react';
import { ToDo, toggleToDo } from './state/toDoListSlice';
import { useDispatch } from 'react-redux';

type ToDoTaskProps = {
  categoryName: string;
  tasks: ToDo[];
};

export function TaskComponent({ categoryName, tasks }: ToDoTaskProps) {
  const dispatch = useDispatch();
  return (
    <>
      <label>{categoryName}</label>
      <div className="taskList">
        {tasks.map((task) => {
          return (
            <div className="task" key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => dispatch(toggleToDo(task))}
              />
              <label>{task.task}</label>
            </div>
          );
        })}
      </div>
    </>
  );
}
