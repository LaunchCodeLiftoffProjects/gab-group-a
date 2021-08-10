import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter as Router} from "react-router-dom";
import NavBar from "./NavBar"

ReactDOM.render(
  <Router>
    <div className="container outer-container">
      <NavBar />
      <App />
    </div>
  </Router>,
  document.getElementById('root')
);

