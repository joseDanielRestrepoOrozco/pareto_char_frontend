import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App.tsx';
import Providers from '@/components/Providers.tsx';

createRoot(document.getElementById('root')!).render(
  <Providers>
    <StrictMode>
      <App />
    </StrictMode>
  </Providers>
);
