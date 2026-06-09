import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { TranslationProvider } from './context/TranslationContext';
import './styles.css';

const root = createRoot(document.getElementById('root') || document.body.appendChild(document.createElement('div')));
root.render(
  <React.StrictMode>
    <TranslationProvider>
      <BrowserRouter basename="/quiz">
        <App />
      </BrowserRouter>
    </TranslationProvider>
  </React.StrictMode>
);
