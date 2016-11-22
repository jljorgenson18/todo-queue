import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    header: {
        width: '100%',
        backgroundColor: '#444',
        color: '#FFF',
        padding: 16,
        display: 'flex',
        justifyContent: 'center'
    }
};

class Header extends Component {
    render() {
        return (
            <div id='header' style={ styles.header }>
              <h1>The Todo Queue</h1>
            </div>
            );
    }
}

export default Header;
