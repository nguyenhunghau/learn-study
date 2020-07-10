import React from 'react';
import logo from './logo.svg';
import './App.css';
import './components/css/style.css';
import Home from './pages/home/index';
import Validation from './pages/form/validation';
import Table from './pages/form/table';
import {TeachingClass} from './pages/teaching/index'
import {RegisterTeaching} from './pages/teaching/register';
import Login from './pages/login/index';
import Register from './pages/register/index'
import {Profile} from './pages/account/profile'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ReactNotifications from 'react-notifications-component';

class App extends React.Component {

  render() {

    return (
      <div className="App">
          <ReactNotifications />
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/validation" component={Validation} />
              <Route exact path="/table" component={Table} />
              <Route exact path="/teaching" component={TeachingClass} />
              <Route exact path="/teaching-register" component={RegisterTeaching} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/profile/:code" component={Profile} />
            </Switch>
          </Router>
        </div>
    );
  }
}

export default App;
