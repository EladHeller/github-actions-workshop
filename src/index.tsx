import { createRoot } from 'react-dom/client';
import ToDoDataLayer from './ToDoDataLayer';
import ToDoApp from './ToDoApp';

function main() {
  const dataLayer = ToDoDataLayer();

  createRoot(document.body).render(
    <ToDoApp dataLayer={dataLayer} />,
  );
}

main();
