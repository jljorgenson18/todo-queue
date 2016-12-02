import React, { Component, PropTypes } from "react";
import IconButton from "material-ui/IconButton";
import moment from "moment";
import Popover from "material-ui/Popover";
import ActionDelete from "material-ui/svg-icons/action/delete";
import RaisedButton from "material-ui/RaisedButton";
import ReactMarkdown from "react-markdown";
import { Card, CardActions, CardText, CardHeader } from "material-ui/Card";
import { grey700 } from "material-ui/styles/colors";

const styles = {
    card: {
        margin: "4px 0",
        backgroundColor: "white",
        width: "100%",
        maxWidth: 500,
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
        width: 250,
        padding: 16,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    confirmLabel: {
        width: "100%",
        margin: 0,
        marginBottom: 16
    },
    description: {
    }
};

class TodoItem extends Component {

    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.getDescriptionElement = this.getDescriptionElement.bind(this);
        this.handleRequestClose = () => this.setState({
            open: false
        });
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

    getDescriptionElement() {
        if(this.state.editing) {
            return (
                <textarea name="description" value=""></textarea>
                );
        } else {
            return (
                <ReactMarkdown source={ this.props.todo.doc.description } />
                );
        }
    }

    render() {
        const {todo, onTodoSelect} = this.props;
        return (
            <Card onClick={ () => onTodoSelect(todo) } style={ styles.card }>
              <CardHeader title={ todo.doc.title }
                subtitle={ `Added ${moment(todo.doc.createdAt).fromNow()}` }
                actAsExpander={ true }
                showExpandableButton={ true } />
              <CardText expandable={ true }>
                { this.getDescriptionElement() }
              </CardText>
              <CardActions expandable={ true }>
                <IconButton tooltip="Delete Todo"
                  tooltipPosition="top-center"
                  style={ styles.iconButtons }
                  onClick={ this.handleDeleteClick }>
                  <ActionDelete />
                </IconButton>
              </CardActions>
              <Popover open={ this.state.open }
                anchorEl={ this.state.anchorEl }
                zDepth={ 3 }
                targetOrigin={ { vertical: "top", horizontal: "left" } }
                anchorOrigin={ { vertical: "bottom", horizontal: "left" } }
                onRequestClose={ this.handleRequestClose }>
                <div style={ styles.confirm }>
                  <h5 style={ styles.confirmLabel }>{ "Are you sure you want to delete this todo?" }</h5>
                  <RaisedButton label="Yes!" secondary={ true } onClick={ this.handleRemove } />
                  <RaisedButton label="Nah I'm Good" onClick={ this.handleRequestClose } />
                </div>
              </Popover>
            </Card>
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
