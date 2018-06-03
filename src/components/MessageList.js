import React, { Component } from 'react';

export class MessageList extends Component {
  constructor(props){
    super(props);
      this.messagesRef = this.props.firebase.database().ref('messages');
      this.handleChange = this.handleChange.bind(this);
      this.createMessage = this.createMessage.bind(this);
      this.state={
        username:"",
        content:"",
        sentAt:"",
        roomId:"",
        messages: []

  };
}

componentDidMount(){
  this.messagesRef.orderByChild("roomId").on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    console.log(message);
    this.setState({ messages:this.state.messages.concat(message ) });
  });
}

handleChange(e){
  e.preventDefault();
  this.setState({
    content: e.target.value
  });
}

createMessage(e){
  e.preventDefault();
  this.messagesRef.push({
    username: this.props.user,
    content: this.state.content,
    sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
    roomId: this.props.activeRoom.key
  });
  this.setState({content:""});
}

render(){

  const messageBlock =(
    <form onSubmit={this.createMessage}>
      <input type="text" value={this.state.content} placeholder="Message" onChange={this.handleChange}/>
      <input type="submit" value="Send" />
    </form>
  );



  return(
    <div>
      <div>{messageBlock}</div>
      <ul>
      {this.state.messages.map((message) => (
        <li key={message.key}>
        message : {message.content}
        </li>
      ))}
      </ul>
    </div>
  );
}


}
