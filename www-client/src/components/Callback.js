import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';

class Callback extends Component {
  componentDidMount() {
    if (/access_token|id_token|error/.test(window.location.hash)) {
      this.props.auth.handleAuthentication();
    }
  }

  render() {
    return (
      <Paper
        style={{
          padding: '3em'
        }}>
        <CircularProgress
          size={80}
          thickness={5}
          style={{
            left: '50%',
            marginLeft: '-40px'
          }}
        />
      </Paper>
    );
  }
}

export default Callback;
