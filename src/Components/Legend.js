import React from 'react';
export default function Legend(props) {
	return (
		<div className='legend'>
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
	)
}