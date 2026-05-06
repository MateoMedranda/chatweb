module.exports = httpServer =>{
    const {server} = require("socket.io");
    const io = new server(httpServer);
    io.on("connection", socket =>{
        console.log(socket.id);
    });
}