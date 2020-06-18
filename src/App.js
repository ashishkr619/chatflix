import React from 'react';
import './App.css';
import RoomList from './components/RoomList'
import MessageList from './components/MessageList'
import CreateRoom from './components/CreateRoom'
import SubmitMessageForm from './components/SubmitMessageForm'


class App extends React.Component{
  render(){
    return(
      <div className="app">
        <RoomList/>
        <MessageList/>
        <CreateRoom/>
        <SubmitMessageForm/>


      </div>
    )
  }
}
export default App;
