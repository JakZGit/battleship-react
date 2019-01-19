import React, {Component} from 'react';
import Square from './Square';
import './index.js';
import util from './Util/Helpers';

const NUMBER_OF_SHIPS = 5;

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(36).fill(null),
      shipArray: Array(36).fill(null),
      shipMap: null,
      turns: 25
    };
  }

  componentDidMount() {
  	let r = util.getRandom(1,36);
	let ship = 1;
	const shipArray = this.state.shipArray.slice();
  	const shipMap = {0 : 1};

	while(ship <= NUMBER_OF_SHIPS) {
	    let direction = util.getRandom(0,1);
	    while(!util.validate(r,direction,shipArray,6,ship)) {
	        direction = util.getRandom(0,1);
	        r = util.getRandom(1,36);
	    }
	    util.placeShips(r,shipMap,ship,6,direction,shipArray);
	    ship++;
	}
	this.setState({loading: false, shipArray: shipArray, shipMap: shipMap});
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
  	if(this.state.turns === 1) {
  		this.resolveGame();
  	} else {
  		this.setState((prevState,props) => {
	  		return {turns: prevState.turns - 1, squares: squares, shipArray: shipArray, shipMap: shipMap};
	  	})
  	}
  }

  resolveGame() {
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
  	this.setState((prevState,props) => {
	  		return {turns: prevState.turns - 1, squares: squares, shipArray: shipArray};
	  	})
  }

  renderSquare(i) {
  	return (
  		<Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />
  	)
  }

  renderRow(i) {
  	let row = [];
  	for(let index = i; index < i + 6; index++) {
  		row.push(this.renderSquare(index));
  	}
  	return (
  		<div className='board-row'>
  			{row}
  		</div>
  		)
  }

  renderText() {
  	let text = [];
  	let shipMap = this.state.shipMap;
  	for(let key in shipMap) {
  		if(key !== 0 && shipMap[key].lives === 0) {
  			let message = <p>You've successful destroyed the {shipMap[key].name}</p>;
  			text.push(message);
  		}
  	}
  	return text;
  }

  render() {
	  	return (
	  		<div>
		  		<h1>Moves remaining: {this.state.turns}</h1>
		  		<div>{this.renderText()}</div>
		  		<div className='board'>
		  			<div>
			  			<table>
				  			<tbody>
				  			 <tr>
				  			 	<th>Ship Name</th>
							    <th>Ship Code</th>
							  </tr>
							  <tr>
				  			 	<th>Falcon</th>
							    <th>1</th>
							  </tr>
							  <tr>
				  			 	<th>Marco</th>
							    <th>2</th>
							  </tr>
							  <tr>
				  			 	<th>Tank</th>
							    <th>3</th>
							  </tr>
							  <tr>
				  			 	<th>Aerial</th>
							    <th>4</th>
							  </tr>
							  <tr>
				  			 	<th>Bomb</th>
							    <th>5</th>
							  </tr>
							  </tbody>
			  			</table>
		  			</div>
		  			<div>
		  				{this.renderRow(0)}
		  				{this.renderRow(6)}
		  				{this.renderRow(12)}
		  				{this.renderRow(18)}
		  				{this.renderRow(24)}
		  				{this.renderRow(30)}
				  	</div>
		  		</div>
	  		</div>
	  	)
  }
}

