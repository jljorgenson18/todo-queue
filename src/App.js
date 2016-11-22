import React, { Component } from "react";
import FlatButton from "material-ui/FlatButton";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Header from "./components/Header";
import TodoItem from "./components/TodoItem";
import { addTodo, removeTodo, getTodos, addDbChangeListener } from "./db";

const styles = {
    container: {
        color: "#555",
        fontFamily: "Roboto, sans-serif"
    },
    layout: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 16
    }
};

const muiTheme = getMuiTheme({
    palette: {}
});

class App extends Component {

    constructor() {
        super();
        this.state = {
            todos: {
                rows: []
            }
        };
        this.handleRemove = this.handleRemove.bind(this);
        this.setTodosInState = this.setTodosInState.bind(this);
    }

    componentDidMount() {
        addDbChangeListener(this.setTodosInState);
        this.setTodosInState();
    }

    setTodosInState() {
        getTodos().then(todos => {
            console.log(todos);
            this.setState({
                todos: todos
            });
        });
    }

    handleClick() {
        addTodo("A random todo");
    }

    handleRemove(todo) {
        removeTodo(todo.doc);
    }

    render() {
        const {rows} = this.state.todos;
        return (
            <MuiThemeProvider muiTheme={ muiTheme }>
              <div style={ styles.container }>
                <Header />
                <div id="layout" style={ styles.layout }>
                  <FlatButton label="Hello there" primary={ true } onClick={ this.handleClick.bind(this) } />
                  { rows.map(todo => {
                        return <TodoItem onClick={ this.handleRemove } key={ todo.id } todo={ todo } />;
                    }) }
                </div>
              </div>
            </MuiThemeProvider>
            );
    }
}

export default App;
