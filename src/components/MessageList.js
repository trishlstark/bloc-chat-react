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
  this.messagesRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messages:this.state.messages.concat(message ) });
  });
}

handleChange(e){
  e.preventDefault();
  this.setState({
    username: "user",
    content: e.target.value,
    sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
    roomId: this.props.activeRoom
  });
}

createMessage(e){
  e.preventDefault();
  this.messagesRef.push({
    username: this.state.username,
    content: this.state.content,
    sentAt: this.state.sentAt,
    roomId: this.state.roomId
  });
  this.setState({username:"", content:"", sentAt:"", roomId:""});
}

render(){

  const messageBlock =(
    <form onSubmit={this.createMessage}>
      <input type="text" value={this.state.content} placeholder="Message" onChange={this.handleChange}/>
      <input type="submit" value="Send" />
    </form>
  );

  const messageList = (
    this.state.messages.map((message) => {
      <li key={message.key}>
      {message.content}
      </li>
    })
  );

  return(
    <div>
      <div>{messageBlock}</div>
      <ul>{messageList}</ul>
    </div>
  );
}


}
