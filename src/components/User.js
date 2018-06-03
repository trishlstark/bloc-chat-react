import React, { Component } from 'react';

export class User extends Component {
  constructor(props){
    super(props);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);

  };

  signIn(){
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  signOut(){
    this.props.firebase.auth().signOut();
  }

  componentDidMount(){
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }


  render(){
    return(
      <div>
      <h2> Welcome {this.props.greetingName} </h2>
      {this.props.greetingName === "Guest" ?
        <button onClick={this.signIn}>Sign In</button>
        :
        <button onClick={this.signOut}>Sign Out</button>
      }
      </div>
    )
  }
}
