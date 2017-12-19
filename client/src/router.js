import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './containers/App';
import Home from './containers/Home';
import Login from './containers/Login';
import Siginup from './containers/Siginup';
import Users from './containers/Users'
import Post from './containers/Post'
import Config from './containers/Config'

const Routes = () => (
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/post" component={Post} />
        <Route path="/login" component={Login} />
        <Route path="/siginup" component={Siginup} />
        <Route path="/users" component={Users} />
        <Route path="/config" component={Config} />
      </Switch>
    </App>
  </Router>
);
export default Routes;
