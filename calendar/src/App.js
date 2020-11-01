import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import './App.css';

import Home from './pages/home/Home.js';

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route exact path ="/">
            <Home></Home>
          </Route>                
        </Switch>          
      </div>           
    </Router>
  );
}

export default App;
