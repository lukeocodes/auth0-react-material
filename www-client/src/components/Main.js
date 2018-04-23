import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Videos from './Videos';
import Callback from './Callback';

const Main = ({auth}) => {
  const handleAuthentication = (nextState, replace) => {
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      auth.handleAuthentication();
    }
  }

  return (
    <div style={{
      marginTop: '1em'
    }}>
      <Switch>
        <Route exact path='/' render={(props) => <Home auth={auth} {...props} />}/>
        <Route path='/videos' render={(props) => <Videos auth={auth} {...props} />}/>
        <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} />
        }}/>
      </Switch>
    </div>
  );
};

export default Main;