export interface ToDoItem {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface IToDoDataLayer {
  getToDoList(): ToDoItem[];
  addToDoItem(item: ToDoItem): void;
  updateToDoItem(item: ToDoItem): void;
  deleteToDoItem(id: number): void;
}
