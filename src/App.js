import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import {RoomList} from './components/RoomList.js';
import {MessageList} from './components/MessageList.js'


  // Initialize Firebase
    var config = {
    apiKey: "AIzaSyCarwTDfMnBNqyutNeYa_Cup1G8elDXrbk",
    authDomain: "bloc-chat-74429.firebaseapp.com",
    databaseURL: "https://bloc-chat-74429.firebaseio.com",
    projectId: "bloc-chat-74429",
    storageBucket: "bloc-chat-74429.appspot.com",
    messagingSenderId: "632062892009"
  };
  firebase.initializeApp(config);


class App extends Component {
  constructor(props){
    super(props);
      this.state= {activeRoom: ""};
      this.activeRoom = this.activeRoom.bind(this);
  }

  activeRoom(room){
    this.setState({activeRoom: room});
  }

  render() {

    return (
      <div>

        <h1>{this.state.activeRoom.roomName || "Select Room"}</h1>

        <RoomList firebase={firebase} activeRoom={this.activeRoom}/>

        {this.state.activeRoom ? (<MessageList firebase={firebase} activeRoom={this.state.activeRoom.key} user="user"/>) : (null)}

      </div>
    );
  }
}

export default App;
