
export default class SocketManager {
	constructor(io) {
		this.io = io;

		this.io.on('connection', (socket) =>{
			console.log("connection");
		});
	}

}