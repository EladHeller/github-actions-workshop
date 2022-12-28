import escape from 'escape-html';
import { IToDoDataLayer, ToDoItem } from './types';

function createToDoElement(
  toDoItem: ToDoItem,
  isNew: boolean,
  toDoDataLayer: IToDoDataLayer,
): HTMLElement {
  let isSaved = !isNew;
  const toDoElement = document.createElement('tr');
  toDoElement.innerHTML = `
    <td>
      <input class="todo-title" value="${escape(toDoItem.title)}" />
    </td>
    <td>
      <input class="todo-description" value="${escape(toDoItem.description)}" />
    </td>
    <td>
      <input class="todo-copmleted" type="checkbox" ${toDoItem.completed ? 'checked' : ''} />
    </td>
    <td class="buttons">
      ${isNew ? '' : '<button class="delete">Delete</button>'}
      <button class="update">${isNew ? 'Save' : 'Update'}</button>
    </td>
  `;

  toDoElement.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('delete')) {
      toDoDataLayer.deleteToDoItem(toDoItem.id);
      toDoElement.remove();
    } else if (target.classList.contains('update')) {
      const title = toDoElement.querySelector<HTMLInputElement>('.todo-title')?.value || '';
      const description = toDoElement.querySelector<HTMLInputElement>('.todo-description')?.value || '';
      const completed = toDoElement.querySelector<HTMLInputElement>('.todo-copmleted')?.checked || false;
      const updatedItem: ToDoItem = {
        id: toDoItem.id,
        title,
        description,
        completed,
      };
      if (isSaved) {
        toDoDataLayer.updateToDoItem(updatedItem);
      } else {
        target.textContent = 'Update';
        toDoDataLayer.addToDoItem(updatedItem);
        isSaved = true;
        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete';
        deleteButton.textContent = 'Delete';
        target.parentElement?.insertBefore(deleteButton, target);
      }
    }
  });

  return toDoElement;
}

export default function ToDoView(toDoDataLayer: IToDoDataLayer) {
  const todoList = toDoDataLayer.getToDoList();

  const root = document.createElement('div');
  root.className = 'root';
  document.body.appendChild(root);
  if (root) {
    const toDoListElement = document.createElement('table');
    toDoListElement.className = 'todo-list';
    root.appendChild(toDoListElement);
    const titles = document.createElement('thead');
    titles.className = 'titles';
    titles.innerHTML = `
      <th class="title">Title</th>
      <th class="title">Description</th>
      <th class="title">Completed</th>
      <th class="title">Actions</th>
    `;
    toDoListElement.appendChild(titles);

    todoList.forEach((toDoItem) => {
      const toDoElement = createToDoElement(toDoItem, false, toDoDataLayer);
      toDoListElement.appendChild(toDoElement);
    });

    const addButton = document.createElement('button');
    addButton.className = 'add';
    addButton.innerText = 'Add';
    root.appendChild(addButton);

    addButton.addEventListener('click', () => {
      const toDoItem: ToDoItem = {
        id: Date.now(),
        title: '',
        description: '',
        completed: false,
      };
      const toDoElement = createToDoElement(toDoItem, true, toDoDataLayer);
      toDoListElement.appendChild(toDoElement);
    });
  }
}
