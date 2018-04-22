import React, { Component } from 'react';
import './Counter.css';

class Counter extends Component {
  render() {
    const n = this.props.n;
    return (
      <div className='Counter'>
        <span className='titles-container'>
          <h2
            className='title'>
            TodoListo
          </h2>
          <h3
            className='subtitle'>
            {n + (n === 1 ? ' tarea pendiente.' : ' tareas pendientes.')}
          </h3>
        </span>
        <div className='bottom-line'></div>
      </div>
    );
  }
}

export default Counter;