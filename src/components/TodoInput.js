import React, { Component } from 'react';
import './TodoInput.css';

class TodoInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.RefInputField = React.createRef();
  }

  handleChange(e) {
    const target = e.target;
    this.setState((prevState, props) => ({
      value: target.value
    }));
  }

  selectAll(e) {
    e.target.select();
  }

  render() {
    const newElement = {
      content: this.state.value,
      state: 0
    }
    return (
      <form 
        onSubmit={(e) => this.props.handleAdd(e, newElement, this)}
        className="TodoInput">
        <input
          className='btn-add'
          type='submit'
          value='+' />
        <input
          className='input-field'
          autoFocus='true'
          type='text'
          placeholder='Insert text'
          value={this.state.value}
          onChange={(e) => this.handleChange(e)}
          onFocus={(e) => this.selectAll(e)}
          ref={this.RefInputField} >
        </input>
        {/*Las clases deberían ser locales, para no interferir las unas con las otras*/}
      </form>
    );
  }
}

export default TodoInput;