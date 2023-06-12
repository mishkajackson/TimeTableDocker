import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';


const getBaseUrl = () => {
  let url
  switch (process.env.REACT_APP_NODE_ENV) {
    case "production":
        url = 'api'
      break;
    case 'development':
    default:
        url = 'http://localhost:4200/api'
  }
  return url
}
axios.defaults.baseURL = getBaseUrl();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <App />

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
