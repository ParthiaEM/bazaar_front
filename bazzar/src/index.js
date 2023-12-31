import { CookiesProvider } from 'react-cookie';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './fonts/Font.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>
);