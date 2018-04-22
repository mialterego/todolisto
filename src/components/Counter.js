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
            <svg
              className='logo'
              xmlns='http://www.w3.org/2000/svg'
              width='261.427'
              height='196.071'
              viewBox='0 0 69.16935 51.877205'
              id='svg8' >
              <g id='layer1' transform='translate(2884.32 1108.57)'>
                <g id='g4682' transform='translate(0 -8.646)' fill='#999' strokeWidth='0.265'>
                  <path id='path121-0-3-5-4' d='m -2836.7517,-1086.9683 -21.6291,21.6286 -17.2925,-17.2924 -8.646,8.6459 25.9385,25.939 30.271,-30.271 a 13.670831,13.670845 0 0 1 -8.6419,-8.6501 z'
                    fillRule='evenodd' />
                  <ellipse id='path928-40-9-64-1' cx='2823.796' cy='-1091.278' rx='8.646'
                    ry='8.646' transform='scale(-1 1)' />
                </g>
              </g>
            </svg>
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