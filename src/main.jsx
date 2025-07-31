import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/outfit';
import './index.css';
import App from './App.jsx';
import OnlineStatusProvider from './Context/OnlineStatusContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OnlineStatusProvider>
      <App />
    </OnlineStatusProvider>
  </StrictMode>,
);
