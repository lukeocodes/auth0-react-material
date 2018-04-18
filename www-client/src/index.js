import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import WebFont from 'webfontloader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

WebFont.load({
  google: {
    families: ['Roboto:300,400,500', 'sans-serif']
  }
});

ReactDOM.render((
  <MuiThemeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MuiThemeProvider>
), document.getElementById('root'));
registerServiceWorker();
