import React, { Component, PropTypes } from "react";
import Paper from "material-ui/Paper";
import IconButton from "material-ui/IconButton";
import Popover from "material-ui/Popover";
import ActionDelete from "material-ui/svg-icons/action/delete";
import RaisedButton from "material-ui/RaisedButton";
import { grey700 } from "material-ui/styles/colors";

const styles = {
    container: {
        padding: "8px 16px",
        margin: "4px 0",
        backgroundColor: "white",
        width: "100%",
        maxWidth: 500,
        display: "flex",
        alignItems: "center"
    },
    title: {
        margin: 0,
        cursor: "pointer",
        color: grey700,
        flexGrow: 1
    },
    iconButtons: {
        padding: 4
    },
    confirm: {
        padding: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end"
    },
    confirmLabel: {
        margin: 0,
        marginBottom: 16
    }
};

class TodoItem extends Component {

    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);

        this.state = {
            open: false,
            anchorEl: null
        };
    }

    handleRemove() {
        const {onRemove, todo} = this.props;
        onRemove(todo);
    }

    handleDeleteClick(event) {
        event.preventDefault();
        this.setState({
            open: true,
            anchorEl: event.currentTarget
        });
    }

    handleRequestClose() {
        this.setState({
            open: false,
        });
    }

    render() {
        const {todo, onTodoSelect} = this.props;
        return (
            <Paper zDepth={ 1 } style={ styles.container } onClick={ () => onTodoSelect(todo) }>
              <h3 style={ styles.title }>{ todo.doc.title }</h3>
              <IconButton tooltip="Delete Todo" style={ styles.iconButtons } onClick={ this.handleDeleteClick }>
                <ActionDelete />
              </IconButton>
              <Popover open={ this.state.open }
                anchorEl={ this.state.anchorEl }
                zDepth={ 3 }
                targetOrigin={ { vertical: "bottom", horizontal: "right" } }
                anchorOrigin={ { vertical: "top", horizontal: "right" } }
                onRequestClose={ this.handleRequestClose }>
                <div style={ styles.confirm }>
                  <h5 style={ styles.confirmLabel }>Are you sure you want to delete this todo?</h5>
                  <RaisedButton label="Yes!" secondary={ true } onClick={ this.handleRemove } />
                </div>
              </Popover>
            </Paper>
            );
    }
}

TodoItem.propTypes = {
    onRemove: PropTypes.func.isRequired,
    todo: PropTypes.object.isRequired,
    activeTodo: PropTypes.object,
    onTodoSelect: PropTypes.func.isRequired
};

export default TodoItem;
