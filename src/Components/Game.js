import React, {Component} from 'react';
import Square from './Square';
import Legend from './Legend';
import util from '../Util/Helpers';

const NUMBER_OF_SHIPS = 5;

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(36).fill(null),
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
  	const shipArray = this.state.shipArray.slice();
  	const shipMap = Object.assign({}, this.state.shipMap);
  	if(squares[i] !== null) return;
  	if(shipArray[i] !== null) {
  		squares[i] = shipArray[i];
  		shipMap[shipArray[i]].lives--;
  		shipArray[i] = null;
  	} else {
  		squares[i] = 'X';
  	}
  	const messages = this.state.messages.slice();
  	if(squares[i] !== null && squares[i] !== 'X' && shipMap[squares[i]].lives === 0) {
  		messages.push(<p>You have successful destroyed the {shipMap[squares[i]].name}!</p>);
  		shipMap[0]--;
  	}
  	if(this.state.turns === 1 || shipMap[0] === 0) {
  		let result = shipMap[0] === 0 ? 1 : 0;
  		this.resolveGame(result);
  	} else {
  		this.setState((prevState,props) => {
	  		return {turns: prevState.turns - 1, squares: squares,
	  			shipArray: shipArray, shipMap: shipMap, messages: messages};
	  	})
  	}
  }

  resolveGame(val) {
  	const squares = this.state.squares.slice(); //copy state
  	const shipArray = this.state.shipArray.slice();
  	for(let i = 0; i < shipArray.length; i++) {
  		if(squares[i] === null) {
  			if(shipArray[i] === null) squares[i] = 'X';
	  		else {
	  			squares[i] = shipArray[i];
	  			shipArray[i] = null;
	  		}
  		}
  	}
  	const messages = this.state.messages.slice();
  	let text = val ? <p>Game over! You won!</p> : <p>Game over! You lose!</p>
  	messages.push(text);
  	this.setState((prevState,props) => {
	  		return {turns: prevState.turns - 1, squares: squares, shipArray: shipArray, messages: messages};
	  	})
  }

  configureGame() {
  	let r = util.getRandom(1,36);
  	let ship = 1;
  	const shipArray = Array(36).fill(null);
    const shipMap = {0 : 0};
  	while(ship <= NUMBER_OF_SHIPS) {
  	    let direction = util.getRandom(0,1);
  	    while(!util.validate(r,direction,shipArray,6,ship)) {
  	        direction = util.getRandom(0,1);
  	        r = util.getRandom(1,36);
  	    }
  	    util.placeShips(r,shipMap,ship,6,direction,shipArray);
  	    ship++;
  	}
  	this.setState({shipArray: shipArray, squares: Array(36).fill(null),
  							 	shipMap: shipMap, messages: [], turns: 30});
  }

  renderSquare(i) {
  	return (
  		<Square key={i} value={this.state.squares[i]} onClick={() => this.handleClick(i)} />
  	)
  }

  renderRow(i) {
  	let row = [];
  	for(let index = i; index < i + 6; index++) {
  		row.push(this.renderSquare(index));
  	}
  	return (
  		<div className='board-row'>{row}</div>
  		)
  }

  render() {
	  	return (
	  		<div>
		  		<h1>Moves remaining: {this.state.turns}</h1><button onClick={this.configureGame}>Reset</button>
		  		<div className='game'>
		  			<Legend />
		  			<div className='board'>
		  				{this.renderRow(0)}
		  				{this.renderRow(6)}
		  				{this.renderRow(12)}
		  				{this.renderRow(18)}
		  				{this.renderRow(24)}
		  				{this.renderRow(30)}
				  	</div>
				  	<div className='message border'>
				  		<h2>Console</h2>
				  		{this.state.messages}
			  		</div>
		  		</div>
	  		</div>
	  	)
  }
}

