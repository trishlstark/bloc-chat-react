import React, { Component } from 'react';

export class RoomList extends Component {
  constructor(props){
    super(props);
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.state = {
      rooms: []
    };
  }

  componentDidMount(){
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      console.log(snapshot);
      this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }


  render() {

      const listOfRooms = this.state.rooms.map((room) =>
        <li key={room.key}>
          {room.name}
        </li>
      );

      return(
        <ul>{listOfRooms}</ul>
      );
    }


}
