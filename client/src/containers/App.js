import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { injectGlobal } from 'styled-components';
import { Provider } from 'rebass'
import Nav from './../components/Nav';
import './App.css';

import { fetchLoginState, clickLogout } from './../actions/auth';

injectGlobal`
* { box-sizing: border-box; }
body { margin: 0; color: #374047}
`
// Default values
const theme = {
  breakpoints: [32, 48, 64, 80],
  space: [0, 4, 8, 16, 32, 64, 128],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72, 96],
  weights: [100, 400],
  radius: 4,
  font: '-apple-system, BlinkMacSystemFont, sans-serif',
  monospace: '"SF Mono", "Roboto Mono", Menlo, monospace'
}

class App extends Component {
  componentWillMount() {
    this.props.dispatch(fetchLoginState());
  }

  handleLogout() {
    this.props.dispatch(clickLogout());
  }

  render() {
    const { auth, config } = this.props;

    return (
      <Provider theme={theme}>
      {/* <Provider> */}
        <Nav auth={auth} config={config} handleLogout={this.handleLogout.bind(this)} />
        <Route children={this.props.children} />
      </Provider>
    );
  }
}

function select({ auth, config }) {
  return { auth, config };
}
export default withRouter(connect(select)(App));