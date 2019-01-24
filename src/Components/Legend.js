import React from 'react';
export default function Legend(props) {
	return (
		<div className='legend border'>
			<table>
				<tbody>
					<tr>
					 	<th>Ship Name</th>
					    <th>Ship Code</th>
					</tr>
					<tr>
						<th>Carrier</th>
					    <th>1</th>
				  	</tr>
				  	<tr>
						<th>Battleship</th>
					    <th>2</th>
					</tr>
					<tr>
						<th>Destroyer</th>
					    <th>3</th>
					</tr>
					<tr>
						<th>Submarine</th>
					    <th>4</th>
					</tr>
					<tr>
						<th>Patrol Boat</th>
					    <th>5</th>
					</tr>
			  </tbody>
			</table>
		</div>
	)
}