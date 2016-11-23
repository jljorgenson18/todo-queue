import React, { Component } from "react";
import { grey50, grey800 } from "material-ui/styles/colors";

const styles = {
    header: {
        backgroundColor: grey800,
        color: grey50,
        padding: 16,
        display: "flex",
        justifyContent: "flex-start"
    },
    title: {
        margin: 0,
        fontWeight: "normal"
    }
};

class Header extends Component {
    render() {
        return (
            <div id="header" style={ styles.header }>
              <h1 style={ styles.title }>The Todo Queue</h1>
            </div>
            );
    }
}

export default Header;
