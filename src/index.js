import React from 'react';
import ReactDOM from 'react-dom/client';
//import { Web3ReactProvider } from '@web3-react/core'; what is this?
import './index.css';
import App from './App';
//! use this for generic testing
//import DummyApp from './DummyApp';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
