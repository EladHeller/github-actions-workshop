import { createRoot } from 'react-dom/client';
import ToDoDataLayer from './ToDoDataLayer';
import ToDoApp from './ToDoApp';

function main() {
  const dataLayer = ToDoDataLayer();
  const root = document.getElementById('root');
  if (!root) {
    throw new Error('Root element not found');
  }
  createRoot(root).render(
    <ToDoApp dataLayer={dataLayer} />,
  );
}

main();
