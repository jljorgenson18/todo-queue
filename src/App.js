import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from './components/Header';

const styles = {
    container: {
        color: '#555',
        fontFamily: 'Roboto, sans-serif'
    }
};

const muiTheme = getMuiTheme({
    palette: {}
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider muiTheme={ muiTheme }>
              <div style={ styles.container }>
                <Header />
                <FlatButton label='Hello there' primary={ true } />
              </div>
            </MuiThemeProvider>
            );
    }
}

export default App;
