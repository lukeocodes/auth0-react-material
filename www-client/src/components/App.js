import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Auth from '../auth/Auth';

class App extends Component {
  constructor() {
    super();
    this.auth = new Auth();

    this.changeAuthStatus = this.changeAuthStatus.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      authenticated: false,
    };
  }

  changeAuthStatus(authenticated) {
    this.setState({
      authenticated,
    });
    this.props.history.push('/');
  }

  logout() {
    this.auth.logout(() => {
      this.props.history.push('/');
    });
  }

  render() {
    return (
      <div>
        <Header
          isAuthenticated={this.state.authenticated}
          logout={this.logout}
          auth={this.auth}
        />
        <Main
          changeAuthStatus={this.changeAuthStatus}
          auth={this.auth}
        />
      </div>
    );
  }
}

export default withRouter(App);
