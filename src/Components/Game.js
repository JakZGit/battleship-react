import React, {Component} from 'react';
import Square from './Square';
import Legend from './Legend';
import util from '../Util/Helpers';

const NUMBER_OF_SHIPS = 5;
const BOARD_DIMENSIONS = 6;
let MESSAGE_KEY = 0;

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(BOARD_DIMENSIONS * BOARD_DIMENSIONS).fill(null),
      shipArray: null,
      shipMap: null,
      turns: 0,
      messages: []
    };
    this.configureGame = this.configureGame.bind(this);
  }

  componentDidMount() {
  	this.configureGame();
  }

  handleClick(i) {
  	const squares = this.state.squares.slice(); //copy state
  	if(squares[i] !== null) return;
  	const shipArray = this.state.shipArray.slice();
  	const shipMap = Object.assign({}, this.state.shipMap);
  	const messages = this.state.messages.slice();
  	if(shipArray[i] !== null) {
  		shipMap[shipArray[i]].lives--;
  		squares[i] = 'O';
  		if(shipMap[shipArray[i]].lives === 0) {
  			this.revealShip(squares, shipMap[shipArray[i]], shipArray);
  			messages.push(<p key={MESSAGE_KEY++}>You have successful destroyed the {shipMap[squares[i]].name}!</p>);
  			this.setState({messages: messages});
  			shipMap[0]--;
  		}
  	} else {
  		squares[i] = 'X';
  	}
  	if(this.state.turns === 1 || shipMap[0] === 0) {
  		let result = shipMap[0] === 0 ? 1 : 0;
  		this.resolveGame(result,squares,shipArray);
  	} else {
  		this.setState((prevState,props) => {
	  		return {turns: prevState.turns - 1, squares: squares, shipArray: shipArray, shipMap: shipMap};
	  	})
  	}
  }

  revealShip(squares, ship, shipArray) {
  	for(let i = 0; i < ship.location.length; i++) {
  		squares[ship.location[i]] = shipArray[ship.location[i]];
  		shipArray[ship.location[i]] = null;
  	}
  }

  resolveGame(val,squares, shipArray) {
  	for(let i = 0; i < shipArray.length; i++) {
  		if(squares[i] === null || squares[i] === 'O') {
  			if(shipArray[i] === null) squares[i] = 'X';
	  		else {
	  			squares[i] = shipArray[i];
	  			shipArray[i] = null;
	  		}
  		}
  	}
  	let text = val ? <p key={MESSAGE_KEY++}>Game over! You won!</p> : <p key={MESSAGE_KEY++}>Game over! You lose!</p>
  	this.setState((prevState,props) => {
	  		return {turns: prevState.turns - 1, squares: squares, shipArray: shipArray,
	  			messages: [...prevState.messages, text]};
	  	})
  }

  configureGame() {
  	let totalSquares = BOARD_DIMENSIONS * BOARD_DIMENSIONS;
  	let r = util.getRandom(1,totalSquares);
  	let ship = 1;
  	const shipArray = Array(totalSquares).fill(null);
    const shipMap = {0 : 0};
  	while(ship <= NUMBER_OF_SHIPS) {
  	    let direction = util.getRandom(0,1);
  	    while(!util.validate(r,direction,shipArray,BOARD_DIMENSIONS,ship)) {
  	        direction = util.getRandom(0,1);
  	        r = util.getRandom(1,totalSquares);
  	    }
  	    util.placeShips(r,shipMap,ship,BOARD_DIMENSIONS,direction,shipArray);
  	    ship++;
  	}
  	this.setState({shipArray: shipArray, squares: Array(totalSquares).fill(null),
  							 	shipMap: shipMap, messages: [], turns: 30});
  }

  renderSquare(i) {
  	return (
  		<Square key={i} value={this.state.squares[i]} onClick={() => this.handleClick(i)} />
  	)
  }

  renderRow(i) {
  	let row = [];
  	for(let index = i; index < i + BOARD_DIMENSIONS; index++) {
  		row.push(this.renderSquare(index));
  	}
  	return (
  		<div key={i} className='board-row'>{row}</div>
  		)
  }

  renderBoard(BOARD_DIMENSIONS) {
  	let board = [];
  	let start = 0;
  	for(let i = 0; i < BOARD_DIMENSIONS; i++) {
  		board.push(this.renderRow(start));
  		start+=BOARD_DIMENSIONS;
  	}
  	return board;
  }

  render() {
	  	return (
	  		<div>
		  		<h1>Moves remaining: {this.state.turns}</h1><button onClick={this.configureGame}>Reset</button>
		  		<div className='game flex-item'>
		  			<Legend />
		  			<div className='board flex-item'>
		  				{this.renderBoard(BOARD_DIMENSIONS)}
				  	</div>
				  	<div className='message border flex-item'>
				  		<h2>Console</h2>
				  		{this.state.messages}
			  		</div>
		  		</div>
	  		</div>
	  	)
  }
}

