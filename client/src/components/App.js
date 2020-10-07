import React , {Component} from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Landing from './Landing';
import Login from './Login';
import Register from './Register';
import Navbar from './layout/Navbar';
import Alerts from './layout/Alerts';
import setAuthToken from '../utils/setAuthToken';
import store from '../store';
import Home from './pages/Home';
import './App.css'

if(localStorage.token){
    setAuthToken(localStorage.token);
  }


class App extends Component {
    
    render () {
        return (
          <Provider store={ store }>
          <Router>
          <>
            <Navbar />
            <div id="app">
              <Alerts />
              <Switch>
                <Route exact path = '/' component={Home} />
                <Route exact path = '/landing' component={Landing} />
                <Route exact path = '/login' component={Login} />
                <Route exact path = '/register' component={Register} />
              </Switch>
            </div>
          </>
          </Router>
          </Provider>
        )
      }
};

export default App;