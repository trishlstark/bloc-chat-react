import React, { Component } from 'react';

export class RoomList extends Component {
  constructor(props){
    super(props);
    this.roomsRef = this.props.firebase.database().ref("rooms");
    this.createRoom = this.createRoom.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      roomName:"",
      rooms: []
    };
  }

  componentDidMount(){
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  createRoom(e){
    e.preventDefault();
    this.roomsRef.push({roomName: this.state.roomName});
    this.setState({roomName: ""});
  }

  handleChange(e){
    this.setState({roomName: e.target.value});
  }

  pickRoom(room){
    this.props.activeRoom(room);
  }

  render() {

      const roomForm = (
        <form onSubmit={this.createRoom}>
          <input type="text" value={this.state.roomName} placeholder="Room Name" onChange={this.handleChange}/>
          <input type="submit" value="Add Room"/>
        </form>
      );

      const listOfRooms = this.state.rooms.map((room) =>
        <li key={room.key} onClick={(e) => this.pickRoom(room)}>
        {room.roomName}
        </li>
      );

      return(
        <div>
          <div>{roomForm}</div>
          <ul>{listOfRooms}</ul>
        </div>
      );
    }


}
