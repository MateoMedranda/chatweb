const socket = io();

const send = document.getElementById('send-button');
const allMessages = document.getElementById('all-messages');
const message = document.getElementById('message');
const indicator = document.getElementById('typing-indicator');
let typingTimeout;

send.addEventListener('click', () =>{
    // Emito el mensaje y lo envío, luego lo recibo en el servidor y lo mando a todos los clientes conectados, incluido el que lo envió
    socket.emit("message", message.value);
    message.value = "";
});

message.addEventListener("keypress", e =>{
    socket.emit("typing", true);
    clearTimeout(typingTimeout);

    typingTimeout = setTimeout(() => {
        socket.emit("stop_typing");
    }, 2000);
    
    if(e.key === "Enter"){
        socket.emit("message", message.value);
        message.value = "";
    }
});

socket.on('message', ({username, message}) =>{
    const msg = document.createRange().createContextualFragment(`
        <div class="message">
            <div class="image-container">
                <img src="/img/logo.png" width="50px" alt="User Image">
            </div>
            <div class="message-body">
                <div class="user-info">
                    <span class="username">${username}</span>
                    <span class="timestamp">${new Date().toLocaleTimeString()}</span>
                </div>
                <p>${message}</p>
            </div>
        </div>
    `);
    allMessages.appendChild(msg);
});

socket.on('typing', (e) =>{
    const msg = document.createRange().createContextualFragment(`
        <p>${e.indicator}</p>
    `);
    indicator.appendChild(msg);
});

