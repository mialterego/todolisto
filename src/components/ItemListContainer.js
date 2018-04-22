import React, { Component } from 'react';
import './ItemListContainer.css';
import Divider from './Divider';
import TodoItem from './TodoItem';

class ItemListContainer extends Component {

  render() {
    const stateToShow = this.props.stateToShow;

    let nElementsWithRequestedState = 0;

    this.props.itemList.forEach(item => {
      if (item.state === stateToShow) {
        nElementsWithRequestedState++;
      }
    });

    if (nElementsWithRequestedState > 0) {
      return (
        <div>
          <Divider title={this.props.title} />
          {this.props.itemList.map(
            (item) =>
              item.state === stateToShow ?
                <TodoItem
                  key={item.key}
                  item={item}
                  handleDelete={() => this.props.handleItem_Delete(item)}
                  handleAlternateState={() => this.props.handleItem_AlternateState(item)} 
                  handleEdit={(e, item, newContent) => this.props.handleItem_Edit(e, item, newContent)} />
                :
                '')}
          <div className='foot-note'>
            Double click on item to edit.
          </div>
        </div>
      );
    } else {
      return (false); //No probé todavía si anda.
    }
  }
}


export default ItemListContainer;