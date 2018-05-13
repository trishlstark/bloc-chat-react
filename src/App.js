import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import {RoomList} from './components/RoomList.js';


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
  render() {
    return (
      <div>
        <RoomList firebase={firebase}/>
      </div>
    );
  }
}

export default App;
