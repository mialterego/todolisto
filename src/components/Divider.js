import React, { Component } from 'react';
import './Divider.css';

class Divider extends Component {
  render() {
    return (
      <div>
        <hr className='Divider' />
        {this.props.title !== undefined ? <h3 className='DividerTitle'>{this.props.title}</h3> : ''}
      </div>
    );
  }
}

export default Divider;