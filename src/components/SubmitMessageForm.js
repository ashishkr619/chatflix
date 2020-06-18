import React, { Component } from "react";

class SubmitMessageForm extends Component {


	render() {
		return (
			<form className="send-message-form">
				<input
					
					type="text"
					placeholder="Type A Message And Hit Enter"
				/>
			</form>
		);
	}
}

export default SubmitMessageForm;