import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppContainer } from 'react-hot-loader';

import App from './App';

import './Polyfills';

const rootEl = document.getElementById('root');
ReactDOM.render(
    <AppContainer>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </AppContainer>,
    rootEl
);

if(module.hot) {
    module.hot.accept('./App', () => {
        // If you use Webpack 2 in ES modules mode, you can
        // use <App /> here rather than require() a <NextApp />.
        const NextApp = require('./App').default;
        ReactDOM.render(
            <AppContainer>
              <MuiThemeProvider>
                <NextApp />
              </MuiThemeProvider>
            </AppContainer>,
            rootEl
        );
    });
}
