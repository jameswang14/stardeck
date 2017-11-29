
export default class SocketManager {
    constructor(io) {
        this.io = io;
        this.clients = []; // super hacky - replace with redis TODO
        this.io.on('connection', (socket) => { // change to different event TODO
            this.handleGameConnection(socket); 

            socket.on('disconnect', () => {
                console.log('Got disconnect!');
                var i = this.clients.indexOf(socket);
                this.clients.splice(i, 1);
            }); 
        });
    }
    handleGameConnection(socket) {
        socket.join('testroom'); // replace with generated room name TODO
        this.clients.push(socket);
        this.io.to('testroom').emit("newplayer", this.clients.length);
    }

}