import { useState } from 'react';
import { IToDoDataLayer, ToDoItem } from './types';

interface ToDoItemProps {
  toDoItem: ToDoItem;
  onUpdated: (editedToDoItem: ToDoItem) => void;
  onDelete: (id: number) => void;
}

export function ToDoItemRow(props: ToDoItemProps) {
  const {
    toDoItem, onUpdated, onDelete,
  } = props;
  const [title, setTitle] = useState(toDoItem.title);
  const [description, setDescription] = useState(toDoItem.description);
  const [completed, setCompleted] = useState(toDoItem.completed);
  const [isDirty, setIsDirty] = useState(false);

  return (
    <tr>
      <td>
        <input className='todo-title' value={title} onChange={(e) => {
          setTitle(e.target.value);
          setIsDirty(true);
        }} />
      </td>
      <td>
        <input className='todo-description' value={description} onChange={(e) => {
          setDescription(e.target.value);
          setIsDirty(true);
        }} />
      </td>
      <td>
      {toDoItem.isNew ? '' : <input className='todo-copmleted' type='checkbox' checked={completed} onChange={(e) => {
        setCompleted(e.target.checked);
        setIsDirty(true);
      }} />}
      </td>
      <td className='buttons'>
        {toDoItem.isNew ? '' : <button className='delete' onClick={() => onDelete(toDoItem.id)}>Delete</button>}
        <button
          className='update'
          disabled={!isDirty && !!description && !!title}
          onClick={() => {
            onUpdated({
              id: toDoItem.id,
              title,
              description,
              completed,
            });
            setIsDirty(false);
          }} > {toDoItem.isNew ? 'Save' : 'Update'}</button>
      </td>
    </tr>
  );
}

export default function ToDoApp(props: { dataLayer: IToDoDataLayer }) {
  const { dataLayer } = props;
  const [toDoList, setToDoList] = useState(dataLayer.getToDoList());

  return (
    <div className='root'>
      <table className='todo-list'>
        <thead className='titles'>
          <th className='title'>Title</th>
          <th className='title'>Description</th>
          <th className='title'>Completed</th>
          <th className='title'>Actions</th>
        </thead>
        {toDoList.map((toDoItem) => (
          <ToDoItemRow key={toDoItem.id} toDoItem={toDoItem} onDelete={(id) => {
            dataLayer.deleteToDoItem(id);
            setToDoList(dataLayer.getToDoList());
          }}
          onUpdated={(editedToDoItem) => {
            if (toDoItem.isNew) {
              dataLayer.addToDoItem(editedToDoItem);
            } else {
              dataLayer.updateToDoItem(editedToDoItem);
            }
            setToDoList(dataLayer.getToDoList());
          }}/>
        ))}
      </table>
      <button className='add' onClick={() => {
        const toDoItem: ToDoItem = {
          id: Date.now(),
          title: '',
          description: '',
          completed: false,
          isNew: true,
        };
        setToDoList([...toDoList, toDoItem]);
      }}>Add</button>
    </div>
  );
}
