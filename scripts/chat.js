class Chatroom {

  constructor(room, username){
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats');
    this.unsub;
  }

  // this ads the chat
  async addChat(message){
    // format a chat object
    const now = new Date();
    const chat = {
      message: message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    };

    // save the chat document
    const response = await this.chats.add(chat);
    return response;
  }

  // this gets the initialy when the app starts and whenever 
  // a new document gets added
  getChats(callback){
    this.unsub = this.chats
      .where('room', '==', this.room)
      .orderBy('created_at')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type === 'added'){
            // this gets the data when a new
            // document gets added
            callback(change.doc.data());
          }
        });
    });
  }

  updateName(username){
    // this updates the username
    this.username = username;
    localStorage.setItem('username', username);
  }

  updateRoom(room){
    // this updates the room stops getting
    // data from the old room and gets the 
    // data from the new updated room
    this.room = room;
    console.log('room updated');
    if(this.unsub){
      this.unsub();
    }
  }
}