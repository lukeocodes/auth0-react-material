import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Auth from '../auth/Auth';

class App extends Component {
  authorized(authenticated) {
    this.setState({ authenticated });
    this.props.history.push('/');
  }

  deauthorized() {
    this.props.history.push('/');
  }

  constructor() {
    super();
    this.auth = new Auth();
    this.auth.authorizedCallback = this.authorized.bind(this);
    this.auth.deauthorizedCallback = this.deauthorized.bind(this);

    this.state = { authenticated: false };
  }

  render() {
    return (
      <div>
        <Header
          isAuthenticated={this.state.authenticated}
          auth={this.auth}
        />
        <Main
          auth={this.auth}
        />
      </div>
    );
  }
}

export default withRouter(App);
