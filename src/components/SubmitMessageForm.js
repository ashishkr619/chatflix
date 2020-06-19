import React, { Component } from "react";

class SubmitMessageForm extends Component {
	constructor(props){
	super(props)
	this.state ={
		message :''
	}
	this.handleChange = this.handleChange.bind(this)//binds the handleChange to a component's instance
	this.handleSubmit = this.handleSubmit.bind(this)
	}
	
	handleChange(e){
		console.log(e.target.value)
		this.setState({
			message :e.target.value

		})

	}

	handleSubmit(e){
		e.preventDefault()
		console.log(this.state.message)
		//connect to ably and send the actual message(this.state.message) in next step

	}

	render() {
		console.log(this.state.message)
		return (
			<form className="send-message-form" onSubmit={this.handleSubmit}>
				<input
					type="text"
					onChange={this.handleChange}
					value={this.state.message}
					placeholder="type a message and hit Enter..."
				/>
			</form>
		);
	}
}

export default SubmitMessageForm;