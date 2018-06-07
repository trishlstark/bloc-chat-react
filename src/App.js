import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import {RoomList} from './components/RoomList.js';
import {MessageList} from './components/MessageList.js';
import {User} from './components/User.js';

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
      this.state= {activeRoom: "", user:null};
      this.activeRoom = this.activeRoom.bind(this);
      this.setUser = this.setUser.bind(this);
  }

  activeRoom(room){
    this.setState({activeRoom: room});
  }

  setUser(user){
    this.setState({user: user});
  }

  render() {

    const currentUser= this.state.user === null ? "Guest" : this.state.user.displayName;

    return (
      <div>

        <User firebase={firebase} setUser={this.setUser} greetingName={currentUser}/>

        <h1>{this.state.activeRoom.roomName || "Select Room"}</h1>

        <RoomList firebase={firebase} activeRoom={this.activeRoom}/>

        {this.state.activeRoom ? (<MessageList firebase={firebase} activeRoom={this.state.activeRoom.key} user={this.currentUser}/>) : null}

      </div>
    );
  }
}

export default App;
