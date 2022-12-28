import ToDoDataLayer from '../ToDoDataLayer';

describe('ToDoDataLayer', () => {
  afterEach(() => {
    localStorage.clear();
  });

  it('should return an empty array when there is no data in the local storage', () => {
    const dataLayer = ToDoDataLayer();
    expect(dataLayer.getToDoList()).toEqual([]);
  });
  it('should return an array of ToDoItem when there is data in the local storage', () => {
    const dataLayer = ToDoDataLayer();
    const item = {
      id: 1,
      title: 'Test',
      description: 'Test',
      completed: false,
    };
    dataLayer.addToDoItem(item);
    expect(dataLayer.getToDoList()).toEqual([item]);
  });
  it('should update to do item', () => {
    const dataLayer = ToDoDataLayer();
    const item = {
      id: 1,
      title: 'Test',
      description: 'Test',
      completed: false,
    };
    dataLayer.addToDoItem(item);
    const updatedItem = {
      id: 1,
      title: 'Test',
      description: 'Test',
      completed: true,
    };
    dataLayer.updateToDoItem(updatedItem);
    expect(dataLayer.getToDoList()).toEqual([updatedItem]);
  });
  it('should delete to do item', () => {
    const dataLayer = ToDoDataLayer();
    const item = {
      id: 1,
      title: 'Test',
      description: 'Test',
      completed: false,
    };
    dataLayer.addToDoItem(item);
    dataLayer.deleteToDoItem(1);
    expect(dataLayer.getToDoList()).toEqual([]);
  });
  it('should not delete to do item when id does not exist', () => {
    const dataLayer = ToDoDataLayer();
    const item = {
      id: 1,
      title: 'Test',
      description: 'Test',
      completed: false,
    };
    dataLayer.addToDoItem(item);
    dataLayer.deleteToDoItem(2);
    expect(dataLayer.getToDoList()).toEqual([item]);
  });
  it('should not update to do item when id does not exist', () => {
    const dataLayer = ToDoDataLayer();
    const item = {
      id: 1,
      title: 'Test',
      description: 'Test',
      completed: false,
    };
    dataLayer.addToDoItem(item);
    const updatedItem = {
      id: 2,
      title: 'Test',
      description: 'Test',
      completed: true,
    };
    dataLayer.updateToDoItem(updatedItem);
    expect(dataLayer.getToDoList()).toEqual([item]);
  });
});
