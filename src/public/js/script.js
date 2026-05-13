const socket = io();

const send = document.getElementById('send-button');
const allMessages = document.getElementById('all-messages');
const message = document.getElementById('message');
const indicator = document.getElementById('typing-indicator');
let typingTimeout;

send.addEventListener('click', () => {
    socket.emit("message", message.value);
    message.value = "";
});

message.addEventListener("keypress", e => {
    socket.emit("typing", true);
    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
        socket.emit("stop_typing");
    }, 2000);

    if (e.key === "Enter") {
        socket.emit("message", message.value);
        message.value = "";
    }
});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

socket.on('message', ({ username, message }) => {
    const myUsername = getCookie("username");
    const isMine = username === myUsername;
    const messageClass = isMine ? "message sent" : "message received";
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const msgHtml = `
        <div class="${messageClass}">
            ${!isMine ? `
            <div class="image-container">
                <img src="/img/logo.png" width="40px" alt="User Image">
            </div>
            ` : ''}
            <div class="message-bubble">
                ${!isMine ? `<div class="user-info"><span class="username">${username}</span></div>` : ''}
                <p class="text">${message}</p>
                <span class="timestamp">${timeString}</span>
            </div>
        </div>
    `;

    const msg = document.createRange().createContextualFragment(msgHtml);
    allMessages.appendChild(msg);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('typing', (username) => {
    indicator.innerHTML = `
        <div class="typing-indicator-container">
            <span class="typing-username">${username} está escribiendo</span>
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
});

socket.on('stop_typing', () => {
    indicator.innerHTML = '';
});

