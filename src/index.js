import React, { Component } from 'react';
import { render} from 'react-dom';
import { createStore } from 'redux';

const store = createStore((state={ color: 'red', board: [] }, action)=> {
  if(action.type === 'ADD'){
    state = {...state, board: [...state.board, new Array(20).fill('')]};
  }
  if(action.type === 'CHANGE'){
    state = {...state, color: action.color };
  }
  if(action.type === 'COLOR'){
    const current = state.board[action.row][action.col];
    const copy = state.board.map( row => {
      return [...row]
    });
    copy[action.row][action.col] = current === state.color ? '': state.color;
    state = {...state, board: copy};
  }
  return state;
});

class App extends Component{
  constructor(){
    super();
    this.state = store.getState();
  }
  addRow(){
    store.dispatch({type: 'ADD'});
  }
  componentDidMount(){
    store.subscribe(()=> {
      this.setState(store.getState());
    });
    this.addRow();
  }
  render(){
    const { board, color } = this.state;
    const { addRow } = this;
    return (
      <div>
          <h1>Pixelate</h1>
          <div style={{ backgroundColor: color }}>
            <button id='add-row' onClick={ addRow }>Add a row</button>
            <select onChange={(ev)=> store.dispatch({ type: 'CHANGE', color: ev.target.value})}>
              <option value="red">Red</option>
              <option value="orange">Orange</option>
              <option value="yellow">Yellow</option>
            </select>
          </div>
          <table>
            <tbody>
            {
              board.map( (row, idx) => {
                return (
                  <tr key={ idx }>
                    {
                      row.map( (cell, _idx) => {
                        return (
                          <td onClick={ ()=> store.dispatch({ row: idx, col: _idx, type: 'COLOR'})} key={ _idx } style={{ backgroundColor: cell}}></td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
            </tbody>
          </table>
      </div>
    );
  }
}

render(<App />, document.querySelector('#root'));


