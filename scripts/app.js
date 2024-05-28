const chatlist = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

newChatForm.addEventListener("submit", e => {
  e.preventDefault();

  const message = newChatForm.message.value.trim();
  chatroom.addChat(message).then(() => newChatForm.reset()).catch(e => console.log(e));
});

newNameForm.addEventListener("submit", e => {
  e.preventDefault();
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);

  newNameForm.reset();
  updateMssg.innerText = `Your name was updated to ${ newName }`;

  setTimeout(() => updateMssg.innerText = '', 4000);
});

rooms.addEventListener("click", (e) => {
  if(e.target.tagName === 'BUTTON'){
    chatUI.clear();
    chatroom.updateRoom(e.target.getAttribute('id'));
    chatroom.getChats(chat => chatUI.render(chat));
  }
});

const username = localStorage.username ? localStorage.username : '???'; 

const chatUI = new ChatUi(chatlist);
const chatroom = new Chatroom('general', username);

chatroom.getChats(data => chatUI.render(data));