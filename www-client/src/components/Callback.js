import React, {Component} from 'react';

class Callback extends Component {
  componentDidMount() {
    if (/access_token|id_token|error/.test(window.location.hash)) {
      this.props.auth.handleAuthentication(this.props.changeAuthStatus);
    }
  }

  render() {
    return (
      <div>
        cb-ing...
      </div>
    );
  }
}

export default Callback;
