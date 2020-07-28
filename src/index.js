import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
  return (
    <button className="square" onClick={props.onClick} >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(){
    super()
    this.state = {
      squares: Array(9).fill(null),
      player: true
    }
  }

  handleClick(i){
    if(this.state.squares[i] !== null){
      return
    }
    const squares = this.state.squares.slice()
    this.state.player ? squares[i] = "X" : squares[i] = "O"
    this.setState({
      squares,
      player: !this.state.player
    })
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => {this.handleClick(i)}} />;
  }

  render() {
    const status = 'Next player: ' + (this.state.player ? "X" : "O");

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}


ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
