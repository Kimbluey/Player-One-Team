import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      Xmen: "X",
      Orange: "O",
      turnNow: "O",
      board: [
        "", "", "", "", "", "", "", "", ""
      ],
      winner: null,
    }
  }

  handleClick(index) {
    if(this.state.board[index] === "" && !this.state.winner) {
      this.state.board[index] = this.state.turnNow
      this.setState({
        board: this.state.board,
        turnNow: this.state.turnNow === this.state.Xmen ? this.state.Orange : this.state.Xmen,
        winner: this.checkForWinner(),
      })
    }
  }

  checkForWinner() {
    var turnNow = this.state.turnNow
    var symbols = this.state.board
	//this is the winning combos
    var theCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
    return theCombos.find(function(combo) {
      if(symbols[combo[0]] !== "" && symbols[combo[1]] !== ""  && symbols[combo[2]] !== ""  && symbols[combo[0]] === symbols[combo[1]] && symbols[combo[1]] === symbols[combo[2]]) {
        return turnNow
      } else {
        return false
      }
    })
  }

  render() {
    return (
      <div className="app-container">
        {this.state.winner ? <h1>{`The winner is ${this.state.winner}`}</h1> : null}
        <div className="board">
        {this.state.board.map((cell, index) => {
          return <div onClick={() => this.handleClick(index)} className="square">{cell}</div>;
        })}
        </div>
      </div>
    )
  }
}
















export default App;
