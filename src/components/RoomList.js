import React, { Component } from "react";

class RoomList extends Component {
	render() {
		
		return (
			<div className="room-list">
				<ul>
					<h3>Rooms:</h3>
                        
                        <li  className="room"><a href="#"># Vikings</a> </li>
                        <li  className="room"><a href="#"># Medici</a> </li>
                        <li  className="room"><a href="#"># Prison Break</a> </li>
                        <li  className="room"><a href="#"># Breaking Bad</a> </li>
									
				</ul>
			</div>
		);
	}
}

export default RoomList;