import Ship from '../Ship';
export default {
	getRandom(min,max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	validate(pos, direction, arr, dim, shipSize) {
		let max = (direction === 1) ? arr.length : ((pos<= dim) ? dim : Math.ceil(pos/dim) * dim);
		let increment = (direction === 1) ? dim : 1;
		let counter = 0; // used to count amount of spaces for ship
		for(let i = pos - 1; i < max && counter < shipSize; i+=increment) {
			if(arr[i] !== null)
				return false;
			else counter++;
		}

		return shipSize === counter;
	},

	placeShips(pos, shipMap, shipSize, dim, dir, arr) {
		let increment = (dir === 1) ? dim : 1;
		let currentHash = shipMap[0]++;
		let counter = 0;
		for(let i = pos - 1; counter < shipSize; i+=increment) {
			arr[i] = currentHash;
			counter++;
		}
		let ship = new Ship(shipSize, shipSize, "Falcon");
		shipMap[currentHash] = ship;
	}
}


