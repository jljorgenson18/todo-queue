import React, { Component, PropTypes } from "react";

const styles = {};

class TodoItem extends Component {

    handleClick() {
        const {onClick, todo} = this.props;
        onClick(todo);
    }

    render() {
        const {todo} = this.props;
        return (
            <h3 onClick={ this.handleClick.bind(this) }>{ todo.doc.title }</h3>
            );
    }
}

TodoItem.propTypes = {
    onClick: PropTypes.func.isRequired,
    todo: PropTypes.object.isRequired
};

export default TodoItem;
