import React from 'react';
import { useState } from 'react';
import './styles.css';

function RootComponent() {
  const [toDoList, setToDoList] = useState<string[]>([]);
  const [task, setTask] = useState('');
  const addToDo = () => {
    setToDoList([...toDoList, task]);
    setTask('');
  };

  return (
    <div className="container">
      <div className="taskList">
        {toDoList.map((task) => {
          return <div className="task">{task}</div>;
        })}
      </div>
      <div className="addTaskControls">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Task to do"
        />
        <button onClick={(e) => addToDo()}>Add</button>
      </div>
    </div>
  );
}

export default RootComponent;
