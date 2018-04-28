import React, { Component } from 'react';
import TodoDelete from './TodoDelete';
import TodoEdit from './TodoEdit';
import TodoPlain from './TodoPlain';
import TodoCheckbox from './TodoCheckbox';

class Todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoverDelete: false,
      editing: false,
      newText: ''
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    this.setState({newText: this.props.text});
  }

  handleInput(newText) {
    this.setState({newText: newText});
  }

  onMouseEnter() {
    this.setState({hoverDelete: true});
  }

  onMouseLeave() {
    this.setState({hoverDelete: false});
  }

  onDoubleClick() {
    this.setState({editing: true})
  }

  handleClickOutside() {
    this.setState({editing: false, newText: this.props.text})
  }

  handleKeyPress(key) {
    const text = this.state.newText.trim();
    if (key === 'Enter' && text !== '') {
      this.props.onTodoEdit(this.props._id, text);
      this.setState({editing: false, newText: text});
    } else if (key === 'Escape') {
      this.setState({editing: false, newText: this.props.text});
    }
  }

  render () {
    const {onTodoDelete, getCount, _id, visibility, ...rest} = this.props;
    const {hoverDelete, editing, newText} = this.state;
    return (
      <TodoWithInput
        isEditing={editing}
        id={_id}
        value={newText}
        text={newText}
        onChange={(e) => this.handleInput(e.target.value)}
        onKeyPress={(e) => this.handleKeyPress(e.key)}

        hoverDelete={hoverDelete}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onDoubleClick={this.onDoubleClick}
        onTodoDelete={() => {onTodoDelete(_id, visibility); getCount();}}
        handleClickOutside={this.handleClickOutside}
        {...rest}
      />
    );
  }
}

const withDelete = (Component) =>
  ({hoverDelete, ...rest}) =>
    hoverDelete
    ? <TodoDelete {...rest} />
    : <Component {...rest}>
      <TodoPlain {...rest} />
      <div />
    </Component>

const TodoWithDelete = withDelete(TodoCheckbox);

const withInput = (Component) =>
  ({isEditing, ...rest}) =>
    isEditing
    ? <TodoEdit {...rest} />
    : <Component {...rest} />

const TodoWithInput = withInput(TodoWithDelete);

export default Todo;
