import React, { Component } from "react";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { grey100, grey700 } from "material-ui/styles/colors";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Header from "./components/Header";
import Todos from "./containers/Todos";
import { getTodos, addDbChangeListener } from "./db";

const styles = {
    container: {
        backgroundColor: grey100,
        minHeight: "100vh",
        fontFamily: "Roboto, sans-serif"
    },
    layout: {
        padding: 16
    }
};

const muiTheme = getMuiTheme({
    fontFamily: "Roboto, sans-serif",
    palette: {
        // primary1Color: cyan500,
        // primary2Color: cyan700,
        // primary3Color: grey400,
        // accent1Color: pinkA200,
        // accent2Color: grey100,
        // accent3Color: grey500,
        textColor: grey700
    // alternateTextColor: white,
    // canvasColor: white,
    // borderColor: grey300,
    // disabledColor: fade(darkBlack, 0.3),
    // pickerHeaderColor: cyan500,
    // clockCircleColor: fade(darkBlack, 0.07),
    // shadowColor: fullBlack
    }
});

class App extends Component {

    constructor() {
        super();
        this.state = {
            todos: {
                rows: []
            },
            filter: null,
            activeTodo: null
        };
        this.setTodosInState = this.setTodosInState.bind(this);
    }

    componentDidMount() {
        addDbChangeListener(this.setTodosInState);
        this.setTodosInState();
    }

    setTodosInState() {
        getTodos(this.state.filter).then(todos => {
            this.setState({
                todos: todos
            });
        });
    }

    render() {
        const {rows} = this.state.todos;
        return (
            <MuiThemeProvider muiTheme={ muiTheme }>
              <div style={ styles.container }>
                <Header />
                <div id="layout" style={ styles.layout }>
                  <Todos rows={ rows } />
                </div>
              </div>
            </MuiThemeProvider>
            );
    }
}

export default App;
