import React from 'react';
import './App.css';
import RoomList from './components/RoomList'
import MessageList from './components/MessageList'
import CreateRoom from './components/CreateRoom'
import SubmitMessageForm from './components/SubmitMessageForm'


class App extends React.Component{
  // let's initialize the states we need to maintain
  constructor(){
    super()
    this.state={
      messages:[], // all the messages
      rooms:[], // all the rooms

    }
    this.displayMessage = this.displayMessage.bind(this)
  }
  componentDidMount() {
    /*global Ably*/
    const channel = Ably.channels.get('persistedmessage:vikings');
  
    channel.attach();
      channel.once('attached', () => {
        channel.history((err, page) => {
          // create a new array with comments only in an reversed order (i.e old to new)
          const messages = Array.from(page.items, item => item.data)
  
          this.setState({messages }); 
        });
      });
  }

  displayMessage(message){
    // get the single message,concat to list of messages
    this.setState({
        messages:[...this.state.messages,message] // a way of concating
    })
  }    

  
  render(){
    return(
      <div className="app">
        <RoomList />
        <MessageList messages={this.state.messages}/>
        <CreateRoom/>
        <SubmitMessageForm displayMessage={this.displayMessage}/>


      </div>
    )
  }
}
export default App;
