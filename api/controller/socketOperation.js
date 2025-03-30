const { Server } = require('socket.io');

const initSocket = (server) => {
	const CLIENT_URI = 'http://localhost:5173';
	const io = new Server(server, {
		cors: {
			origin: CLIENT_URI,
			methods: ['GET', 'POST'],
		},
	});

	io.on('connection', (socket) => {
		const { id } = socket;
		console.log(`User ${id}  connected...`);

		socket.on('join_room', (data) => {
			const { roomId } = data;
			socket.join(roomId);
			console.log(`User ${id} joined room ${roomId}`, data);
		});

		socket.on('sent_message', async (messageData) => {
			messageData.time = String(new Date());
			await socket.to(messageData.roomId).emit('receive_message', messageData);
		});

		socket.on('disconnect', () => {
			console.log(`User ${id} disconnected.`);
		});
	});
};

module.exports = { initSocket };
