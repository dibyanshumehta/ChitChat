let username = '';
let currentRoom = '';
let channel = null;

const usernameInput = document.getElementById('username');
const roomInput = document.getElementById('room');
const messageInput = document.getElementById('message');

document.getElementById('enter-btn').addEventListener('click', setUsername);
document.getElementById('join-btn').addEventListener('click', joinRoom);
document.getElementById('send-btn').addEventListener('click', sendMessage);

usernameInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') setUsername();
});

roomInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') joinRoom();
});

messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendMessage();
});

function setUsername() {
  const name = usernameInput.value.trim();
  if (!name) return alert('Please enter a username');
  username = name;
  document.getElementById('login-box').classList.add('hidden');
  document.getElementById('room-box').classList.remove('hidden');
}

function joinRoom() {
  const room = roomInput.value.trim();
  if (!room) return alert('Enter a room name');
  currentRoom = room;
  document.getElementById('room-box').classList.add('hidden');
  document.getElementById('chat-room').classList.remove('hidden');
  document.getElementById('room-name').innerText = `Room: ${room}`;
  channel = new BroadcastChannel(room);
  channel.onmessage = (e) => displayMessage(e.data);
}

function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;
  const msg = {
    username,
    text,
    time: new Date().toLocaleTimeString()
  };
  channel.postMessage(msg);
  displayMessage(msg);
  messageInput.value = '';
}

function displayMessage({ username: sender, text, time }) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'message ' + (sender === username ? 'self' : 'other');
  msgDiv.innerHTML = `<strong>${sender}</strong><br>${text}<br><small>${time}</small>`;
  document.getElementById('messages').appendChild(msgDiv);
  document.getElementById('messages').scrollTop = document.getElementById('messages').scrollHeight;
}
