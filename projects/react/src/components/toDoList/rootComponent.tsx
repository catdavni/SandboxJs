import React from 'react';
import './styles.css';
import { Provider } from 'react-redux';
import { toDoListStore } from './state/toDoListStore';
import { ToDoListComponent } from './toDoListComponent';

function RootComponent() {
  return (
    <Provider store={toDoListStore}>
      <ToDoListComponent />
    </Provider>
  );
}

export default RootComponent;
