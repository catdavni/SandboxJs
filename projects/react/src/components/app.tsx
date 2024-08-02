import React from 'react';
import ToDoList from './toDoList/rootComponent';

function SimpleApp() {
  return (
    <div>
      <h1>Hello, world!</h1>
    </div>
  );
}

function ToDoListApp() {
  return (
    <>
      <ToDoList />
    </>
  );
}

//export default SimpleApp;
export default ToDoListApp;
