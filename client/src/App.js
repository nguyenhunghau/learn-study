import React from 'react';
import logo from './logo.svg';
import './App.css';
import './components/css/style.css';
import Home from './pages/home/index';
import Validation from './pages/form/validation';
import Table from './pages/form/table';
import { TeachingClass } from './pages/teaching/index'
import { RegisterTeaching } from './pages/teaching/register';
import Login from './pages/login/index';
import Register from './pages/register/index'
import ChangePassword from './pages/account/change-pass'
import Profile from './pages/account/profile'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ReactNotifications from 'react-notifications-component';
import { CookiesProvider } from 'react-cookie';
import { createStore } from 'redux';
import Counter from './pages/redux/index';
import { Provider } from 'react-redux';
import RootReducer from './redux/reducer/root-reducer';


const store = createStore(RootReducer);
// store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "CHANGE_RADIO" });
// store.dispatch({ type: "DECREMENT" });
// store.dispatch({ type: "RESET" });

class App extends React.Component {

  render() {

    return (
      <Provider store={store}>
        <CookiesProvider>
          <div className="App">
            {/* <ErrorBoundary> */}
            <ReactNotifications />
            <Router>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/validation" component={Validation} />
                <Route exact path="/table" component={Table} />
                <Route exact path="/teaching" component={TeachingClass} />
                <Route exact path="/teaching-register" component={RegisterTeaching} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/change-password" component={ChangePassword} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/profile/:code" component={Profile} />
                <Route exact path="/redux" component={Counter} />
              </Switch>
            </Router>
          </div>
        </CookiesProvider>
      </Provider>
    );
  }
}

export default App;
