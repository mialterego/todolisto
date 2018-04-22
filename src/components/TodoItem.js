import React, { Component } from 'react';
import './TodoItem.css';

class TodoItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editingMode: false,
      content: this.props.item.content,
      cursorPosition: 0
    }
    this.textFieldRef = React.createRef();
  }

  handleClick(e) {
    const pos = {
      start: e.target.selectionStart,
      end: e.target.selectionEnd
    }
    if (pos.start === pos.end) {
      this.setState(() => ({
        cursorPosition: pos.start
      }));
    }
  }

  handleDoubleClick(e) {
    //window.getSelection().removeAllRanges();
    //e.preventDefault();
    this.setState(() => ({
      editingMode: !this.state.editingMode,
      shouldPositionBeSet: !this.state.editingMode
    }));
  }

  handleInput(e) {
    e.target.style.height = 'auto';
    e.target.style.height = (e.target.scrollHeight) + 'px';

    const target = e.target;
    const item = this.props.item;
    const newContent = target.value;
    this.setState((prevState, props) => ({
      content: newContent
    }));
    this.props.handleEdit(e, item, newContent);
  }

  finishEdition() {
    this.setState(() => ({
      editingMode: false
    }))
  }

  handleChange(e) {
  }

  handleKeyDown(e) {
    //console.log('Key: ' + e.key + '.');
    if (this.state.editingMode === false) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.setState(() => ({
          editingMode: !this.state.editingMode,
          shouldPositionBeSet: false
        }));
      }
    } else if (this.state.editingMode === true) {
      if (e.key === 'Escape') {
        this.finishEdition();
        //console.log(e.target);
      }
    }
  }

  componentDidMount() {
    const textField = this.textFieldRef.current;
    textField.style.height = (textField.scrollHeight) + 'px';
    //textField.style.height = '18px';
  }

  componentDidUpdate() {
    //If the input field was mounted, then focus on it.
    if (this.state.editingMode === true) {
      const textField = this.textFieldRef.current;
      const pos = this.state.cursorPosition;
      textField.focus();
      if (this.state.shouldPositionBeSet === true) {
        textField.setSelectionRange(pos, pos);
        this.setState(() => ({
          shouldPositionBeSet: !this.state.shouldPositionBeSet
        }));
      }
      //textField.focus();
      //✓
    }
  }

  render() {
    let item = this.props.item;
    return (
      <div className='TodoItem-container'>
        <div
          className={'TodoItem' + (this.state.editingMode === true ? ' editing-mode' : '')} >
          <button
            className={'btn-resolve' + (item.state === 1 ? ' resolved' : '')}
            onClick={() => this.props.handleAlternateState()} >
            <svg
              className='item-tickmark'
              xmlns="http://www.w3.org/2000/svg"
              width="261.427"
              height="261.427"
              viewBox="0 0 69.16935 69.16935"
              id="svg8" >
              <g id="layer1" transform="translate(2884.32 1117.216)">
                <g id="g4682" transform="translate(0 -8.646)" fill="#999" strokeWidth="0.265">
                  <path id="path121-0-3-5-4" d="m -2836.7517,-1086.9683 -21.6291,21.6286 -17.2925,-17.2924 -8.646,8.6459 25.9385,25.939 30.271,-30.271 a 13.670831,13.670845 0 0 1 -8.6419,-8.6501 z"
                    fillRule="evenodd" />
                  <ellipse id="path928-40-9-64-1" cx="2823.796" cy="-1091.278" rx="8.646"
                    ry="8.646" transform="scale(-1 1)" />
                </g>
              </g>
            </svg>
          </button>
          <textarea
            onDoubleClick={(e) => this.handleDoubleClick(e)}
            onClick={(e) => this.handleClick(e)}
            rows='1'
            readOnly={!this.state.editingMode}
            ref={this.textFieldRef}
            className={'item-text-field' + (item.state === 1 ? ' resolved' : '')}
            type='text'
            value={this.state.content}
            onChange={(e) => this.handleChange(e)}
            onBlur={(e) => this.finishEdition()}
            onKeyDown={(e) => this.handleKeyDown(e)}
            onInput={(e) => this.handleInput(e)}>
          </textarea>
          <input
            className={'btn-delete' + (item.state === 1 ? ' resolved' : '')}
            type='button'
            onClick={() => this.props.handleDelete()}
            value='x' />
        </div>
      </div>
    );
  }
}

export default TodoItem;