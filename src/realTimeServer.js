module.exports = httpServer =>{
    const {Server} = require("socket.io");
    const io = new Server(httpServer);
    io.on("connection", socket =>{
        socket.on("message", (message) =>{
            const cookie = socket.request.headers.cookie;
            const username = cookie.split("=").pop();
            console.log(`Mensaje recibido de ${username}: ${message}`);
            io.emit("message", {
                username: username,
                message: message
            });
        });

        socket.on("typing", (typing) =>{
            if(typing){
                console.log("Alguien esta escribiendo...");
                const cookie = socket.request.headers.cookie;
                const username = cookie.split("=").pop();
                socket.broadcast.emit("typing", true);
            }
            
        });
    });
}