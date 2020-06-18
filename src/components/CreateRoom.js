import React, { Component } from "react";

class CreateRoom extends Component {

	

	render() {
		return (
			<div className="new-room-form">
				<form>
					<input type="text" placeholder="New Room" required />
					<button id="create-room-btn" type="submit">
						+
					</button>
				</form>
			</div>
		);
	}
}

export default CreateRoom;