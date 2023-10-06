import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.module.scss';
import App from './App';
import { PaginationProvider } from './providers/PaginationProvider/PaginationProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <PaginationProvider>
      <App />
    </PaginationProvider>
  </React.StrictMode>
);
