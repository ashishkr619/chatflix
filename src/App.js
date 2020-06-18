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
      messages:['hello boss','how are you'], // all the messages
      rooms:[], // all the rooms

    }
  }
  
  render(){
    return(
      <div className="app">
        <RoomList />
        <MessageList messages={this.state.messages}/>
        <CreateRoom/>
        <SubmitMessageForm/>


      </div>
    )
  }
}
export default App;
