import type { IToDoDataLayer, ToDoItem } from './types';

/**
 * This is the data layer for the ToDo application.
 * It is responsible for all data access and manipulation.
 * It's get and set the data from the local storage.
 */
export default function ToDoDataLayer(): IToDoDataLayer {
  function getToDoList(): ToDoItem[] {
    return JSON.parse(localStorage.getItem('todoList') || '[]');
  }

  function addToDoItem(item: ToDoItem): void {
    const todoList = getToDoList();
    todoList.push(item);
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }
  function updateToDoItem(item: ToDoItem): void {
    const todoList = getToDoList();
    const index = todoList.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      todoList[index] = item;
      localStorage.setItem('todoList', JSON.stringify(todoList));
    }
  }
  function deleteToDoItem(id: number): void {
    const todoList = getToDoList();
    const index = todoList.findIndex((i) => i.id === id);
    if (index !== -1) {
      todoList.splice(index, 1);
      localStorage.setItem('todoList', JSON.stringify(todoList));
    }
  }
  return {
    getToDoList,
    addToDoItem,
    updateToDoItem,
    deleteToDoItem,
  };
}
