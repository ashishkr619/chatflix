import React from 'react'

class Message extends React.Component{

    render(){
        return(
            <div className='message'>
                <div className='message-text' key={this.props.key}>{this.props.message}</div>
            </div>

            
        
        )
    }
} 

export default Message