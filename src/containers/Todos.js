import React, { Component, PropTypes } from "react";
import RaisedButton from "material-ui/RaisedButton";

import { addTodo, removeTodo } from "../db";
import TodoItem from "../components/TodoItem";

const styles = {
    display: "flex",
    flexDirection: "column",
    maxWidth: 800,
    margin: "0 auto",
    alignItems: "center"
};

class Todos extends Component {

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
        this.handleTodoSelect = this.handleTodoSelect.bind(this);
    }

    handleTodoSelect(todo) {
        console.log(todo);
    }

    handleClick() {
        addTodo("A random todo");
    }

    render() {
        return (
            <div id="todoContainer" style={ styles }>
              <RaisedButton label="Hello there" primary={ true } onClick={ this.handleClick } />
              { this.props.rows.map(todo => {
                    return <TodoItem onRemove={ todo => removeTodo(todo.doc) }
                             key={ todo.id }
                             todo={ todo }
                             onTodoSelect={ this.handleTodoSelect } />;
                }) }
            </div>
            );
    }
}

Todos.propTypes = {
    rows: PropTypes.array.isRequired
};

export default Todos;
