import React, {Component} from 'react';
import Square from './Square';
import './index.js';
import util from './Util/Helpers';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(36).fill(null),
      shipArray: Array(36).fill(null),
      shipMap: {0 : 1},
      loading: true
    };
  }

  componentDidMount() {
  	let r = util.getRandom(1,36);
	let ships = 5;
	const shipArray = this.state.shipArray.slice();
  	const shipMap = Object.assign({}, this.state.shipMap);

	while(ships > 0) {
	    let direction = util.getRandom(0,1);
	    while(!util.validate(r,direction,shipArray,6,ships)) {
	        direction = util.getRandom(0,1);
	        r = util.getRandom(1,36);
	    }
	    util.placeShips(r,shipMap,ships,6,direction,shipArray);
	    ships--;
	}
	this.setState({loading: false, shipArray: shipArray, shipMap: shipMap});
  }

  handleClick(i) {
  	const squares = this.state.squares.slice(); //copy
  	const shipArray = this.state.shipArray.slice();
  	if(squares[i] !== null) return;
  	if(shipArray[i] !== null) {
  		squares[i] = shipArray[i];
  		shipArray[i] = null;
  	} else {
  		squares[i] = 'X';
  	}
  	this.setState({squares: squares, shipArray: shipArray});
  }

  renderSquare(i) {
  	return (
  		<Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />
  	)
  }

  render() {
  	if(this.state.loading)
	  	return <div>Loading...</div>
	 else
	  	return (
	  		<div className='board'>
	  			<div>
			  		<div className='board-row'>
			  			{this.renderSquare(0)}
			  			{this.renderSquare(1)}
			  			{this.renderSquare(2)}
			  			{this.renderSquare(3)}
			  			{this.renderSquare(4)}
			  			{this.renderSquare(5)}
			  		</div>
			  		<div className='board-row'>
			  			{this.renderSquare(6)}
			  			{this.renderSquare(7)}
			  			{this.renderSquare(8)}
			  			{this.renderSquare(9)}
			  			{this.renderSquare(10)}
			  			{this.renderSquare(11)}
			  		</div>
			  		<div className='board-row'>
			  			{this.renderSquare(12)}
			  			{this.renderSquare(13)}
			  			{this.renderSquare(14)}
			  			{this.renderSquare(15)}
			  			{this.renderSquare(16)}
			  			{this.renderSquare(17)}
			  		</div>
			  		<div className='board-row'>
			  			{this.renderSquare(18)}
			  			{this.renderSquare(19)}
			  			{this.renderSquare(20)}
			  			{this.renderSquare(21)}
			  			{this.renderSquare(22)}
			  			{this.renderSquare(23)}
			  		</div>
			  		<div className='board-row'>
			  			{this.renderSquare(24)}
			  			{this.renderSquare(25)}
			  			{this.renderSquare(26)}
			  			{this.renderSquare(27)}
			  			{this.renderSquare(28)}
			  			{this.renderSquare(29)}
			  		</div>
			  		<div className='board-row'>
			  			{this.renderSquare(30)}
			  			{this.renderSquare(31)}
			  			{this.renderSquare(32)}
			  			{this.renderSquare(33)}
			  			{this.renderSquare(34)}
			  			{this.renderSquare(35)}
			  		</div>
		  		</div>
	  		</div>
	  	)
  }
}

