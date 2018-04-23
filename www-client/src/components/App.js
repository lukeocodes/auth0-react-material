import React from 'react';
import Header from './Header';
import Main from './Main';
import Auth from '../auth/Auth';

const auth = new Auth();

const App = () => (
  <div>
    <Header auth={auth} />
    <Main auth={auth} />
  </div>
);

export default App;