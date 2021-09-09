import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";


ReactDOM.render(
  <Router>
    <div className="container outer-container">
    <App />
    </div>
  </Router>,
  document.getElementById('root')
);

