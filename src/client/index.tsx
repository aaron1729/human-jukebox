import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import App from './App';
import '../index.css'
import ErrorBoundary from './Components/ErrorComponent';
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


// to test the window for variables


// this assigns a variable to window, which is accessible as indicated in the console log below.
(window as any).myName = () => 'abcdefghij';
// console.log('hello ' + (window as any).myName)

(window as any).loggit = (data: any) => console.log('the data is:', data);
(window as any).loggit('test the loggit function from index.tsx!')



let myVar: number = 0;
for(let i=0; i < 9; i++) {
  myVar++
}

console.log('myVar is:', myVar);

const myFunc = () => {
  --myVar;
}

myFunc()
myFunc()

console.log('and now myVar is: ' + myVar)
