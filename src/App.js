import React, { Component } from 'react';
import './App.css';
import Counter from './components/Counter';
import TodoInput from './components/TodoInput';
import ItemListContainer from './components/ItemListContainer';

class App extends Component {
  constructor(props){
    super(props);
    //this.onUnload = this.onUnload.bind(this);
    this.state = {
      nextKey: 4,
      itemList: [] //Cada elemento debe tener un id, un contenido y un estado (resuelto o no resuelto)
    }
  }
  
  handleItem_Edit(e, itemToUpdate, newContent){
    e.preventDefault();
    let updatedItemList = this.state.itemList.slice();
    updatedItemList[updatedItemList.indexOf(itemToUpdate)].content = newContent;
    this.setState(() => ({
      itemList: updatedItemList
    }));
  }

  handleItem_Add(e, newElement, inputComponent){
    
    //Para prevenir que el envío del formulario nos lleve a otra página
    e.preventDefault();

    const newItem = {
      key: this.state.nextKey,
      content: newElement.content,
      state: newElement.state
    }
    //console.log('newItem:');
    //console.log(newItem);
    let newItemList = this.state.itemList.slice();
    newItemList.unshift(newItem);

    this.setState(() => ({
      nextKey: this.state.nextKey + 1,
      itemList: newItemList
    }));

    inputComponent.setState(() => ({
      value: ''
    }));

    inputComponent.RefInputField.current.focus();

    //console.log(inputComponent);
  }
  
  handleItem_Delete(item){
    let itemList = this.state.itemList.slice();
    let pos = itemList.indexOf(item);
    //console.log('pos: ' + pos);
    //console.log(item.key);
    
    //No se debe hacer 'itemList = itemList.splice(pos,1);' ya que '(...).splice(pos,1);' actúa como un operador, modificando el array '(...)'. Luego de la modificación, '(...).splice(pos,1);' arroja como return el elemento eliminado del array. 
    itemList.splice(pos,1);

    //console.log('New itemList:');
    //console.log(itemList);
    //el argumento en 'this.setState((prevState) => ({newState}));' siempre será prevState, no importa el nombre que se le ponga.
    this.setState((prevState) => ({
      itemList: itemList
    }));
  }
  
  handleItem_AlternateState(item){
    let itemList = this.state.itemList.slice();
    const pos = itemList.indexOf(item);
    
    const currentState = itemList[pos].state;
    switch(currentState){
      case 0:
        itemList[pos].state = 1;
        break;
      case 1:
        itemList[pos].state = 0;
        break;
      default:
        break;
    }
    
    //el argumento en 'this.setState((prevState) => ({newState}));' siempre será prevState, no importa el nombre que se le ponga.
    this.setState((prevState) => ({
      itemList: itemList
    }));
  }

  saveStateToLocalStorage(){
    //console.log('holas');
    //console.log(JSON.stringify(this.state));
    localStorage.setItem('appState', JSON.stringify(this.state));
    //e.returnValue='';
  }

  componentDidUpdate(){
    this.saveStateToLocalStorage();
  }

  componentDidMount(){
    ////Set callback for when the user leaves the page
    //window.addEventListener("beforeunload", (e) => this.onUnload(e));
    
    //Get data from local storage
    //console.log(JSON.parse(localStorage.getItem('appState')));
    this.setState(() => (
      JSON.parse(localStorage.getItem('appState'))
    ));
  }

  render() {
    let nPending = 0;
    /*let nSolved = 0;*/

    this.state.itemList.forEach((item) => {
      if(item.state === 0){
        nPending++;
        //console.log(nSolved);
      } /*else {
        if(item.state === 1){
          nSolved++;
          //console.log(nSolved);
        }
      }*/
    });

    //console.log(nSolved);

    /*
    <Divider title='Tareas pendientes:' />
        {this.state.itemList.reverse().map((item) => item.state === 0 ? <TodoItem key={item.key} item={item} handleDelete={() => this.handleItem_Delete(item)} handleAlternateState={() => this.handleItem_AlternateState(item)} /> : '')}
        {nSolved > 0 ? 
          <div>
          <Divider title='Tareas resueltas:' />
          {this.state.itemList.reverse().map((item) => item.state === 1 ? <TodoItem key={item.key} item={item} handleDelete={() => this.handleItem_Delete(item)} handleAlternateState={() => this.handleItem_AlternateState(item)} /> : '')}
          </div>
          :
          ''}
    */

    return (
      <div className="App">
        <Counter
          n={nPending/*this.state.itemList.length*/} />
        <TodoInput
          handleAdd={(e, newElement, inputComponent) => this.handleItem_Add(e, newElement, inputComponent)} />
        <ItemListContainer
          itemList={this.state.itemList}
          stateToShow={0}
          title='Pending:'
          handleItem_AlternateState={(item) => this.handleItem_AlternateState(item)}
          handleItem_Delete={(item) => this.handleItem_Delete(item)} 
          handleItem_Edit={(e, item, newContent) => this.handleItem_Edit(e, item, newContent)} />
        <ItemListContainer
          itemList={this.state.itemList}
          stateToShow={1}
          title='Resolved:'
          handleItem_AlternateState={(item) => this.handleItem_AlternateState(item)}
          handleItem_Delete={(item) => this.handleItem_Delete(item)}
          handleItem_Edit={(e, item, newContent) => this.handleItem_Edit(e, item, newContent)} />
      </div>
    );
  }
}

export default App;