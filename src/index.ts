import ToDoDataLayer from './ToDoDataLayer';
import ToDoView from './ToDoView';

function main() {
  const dataLayer = ToDoDataLayer();
  ToDoView(dataLayer);
}

main();
