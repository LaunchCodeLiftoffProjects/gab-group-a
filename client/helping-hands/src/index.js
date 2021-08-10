import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from "react-router-dom";
import NavBar from "./NavBar"

ReactDOM.render(
  <Router>
    <NavBar />
    <App />
  </Router>,
  document.getElementById('root')
);

