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

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onDoubleClick = this.onDoubleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    this.setState({newText: this.props.text});
  }

  handleInput(newText) {
    this.setState({newText: newText});
  }

  onMouseOver() {
    this.setState({hoverDelete: true});
  }

  onMouseOut() {
    this.setState({hoverDelete: false});
  }

  onDoubleClick() {
    this.setState({editing: true})
  }

  handleKeyPress(key) {
    const text = this.state.newText.trim();
    if (key === 'Enter' && text !== '') {
      this.props.onTodoEdit(this.props.id, text);
      this.setState({editing: false, newText:text});
    }
  }

  render () {
    const {onTodoDelete, getCount, id, visibility, ...rest} = this.props;
    const {hoverDelete, editing, newText} = this.state;
    return (

      <TodoWithInput
        isEditing={editing}
        id={id}
        value={newText}
        text={newText}
        onChange={(e) => this.handleInput(e.target.value)}
        onKeyPress={(e) => this.handleKeyPress(e.key)}

        hoverDelete={hoverDelete}
        onMouseOver={() => this.onMouseOver()}
        onMouseOut={() => this.onMouseOut()}
        onDoubleClick={() => this.onDoubleClick()}
        onTodoDelete={() => {onTodoDelete(id, visibility); getCount();}}
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