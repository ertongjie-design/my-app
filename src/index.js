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

  calculateWinner(squares){
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    let flag = 0;
    lines.forEach(i => {
      if(squares[i[0]] === squares[i[1]] && squares[i[1]] === squares[i[2]] && squares[i[0]] !== null){
        flag = squares[i[0]]
      }
    })
    return flag ? "Winner is " + flag : null
  }

  renderSquare(i) {
    return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i, this.calculateWinner(this.props.squares))} />;
  }

  render() {
    const squares = this.props.squares
    const winner = this.calculateWinner(squares)
    const status = winner ? winner : 'Next player: ' + (this.props.player ? "X" : "O")

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
  constructor(props){
    super(props)
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          player: true
        }
      ],
      player: true
    }
  }

  handleClick(i, n){
    const history = this.state.history.slice()
    const player = this.state.player
    const oldSquares = history[history.length-1].squares.slice()
    if(oldSquares[i] !== null || n){
      return
    }
    const newSquares = oldSquares.slice()
    newSquares[i] = player ? "X" : "O"
    debugger
    history.push({
      squares: newSquares,
      player: !player
    })
    this.setState({
      history,
      player: !player
    })
  }

  render() {
    const history = this.state.history
    const squares = history[history.length-1].squares
    const player = this.state.player
    debugger

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={squares} player={player} onClick={(i, n) => {this.handleClick(i, n)}} />
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
