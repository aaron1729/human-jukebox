import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import App from './App';
import '../index.css'
import ErrorBoundary from './Components/ErrorComponent';

let myGlobalVariable: number = 0;
const myGlobalFunc = () => {
  myGlobalVariable++;
}


import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const rootTSX = createRoot(container!);
rootTSX.render(
  <BrowserRouter>
    <CookiesProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </CookiesProvider>
  </BrowserRouter>
);