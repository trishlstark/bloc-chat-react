
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
    content: e.target.value,
    roomId: this.props.activeRoom
  });
}

createMessage(e){
  e.preventDefault();
  this.messagesRef.push({
    username: this.props.user,
    content: this.state.content,
    sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
    roomId: this.state.roomId
  });
  this.setState({content:""});
}

render(){

  const activeRoom = this.props.activeRoom

  const messageBlock =(
    <form onSubmit={this.createMessage}>
      <input type="text" value={this.state.content} placeholder="Message" onChange={this.handleChange}/>
      <input type="submit" value="Send" />
    </form>
  );

  const messageList = (
      this.state.messages.map((message) => {
        if (message.roomId === activeRoom) {
          return <li key={message.key}>{message.username}: {message.content}</li>
        }
        return null;
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
