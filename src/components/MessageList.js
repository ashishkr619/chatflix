import React from 'react'
import Message from './Message'

class MessageList extends React.Component{

    render(){

        return(

            //down in the Messagelist component we receive the list of all messages from App.JS, break them down one by one using map function 
            //and further send individual message to Message component
            <div className='message-list'>
                {this.props.messages.map((message, i) => (
					<Message key={i} message={message} />
				))}
            </div>

            
        
        )
    }
} 

export default MessageList