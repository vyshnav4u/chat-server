const { Server } = require('socket.io');
const { writeMessage } = require('../model/messages.model');
const { WHITE_LIST } = require('../constants/clientInfo');

const initSocket = (server) => {
	const io = new Server(server, {
		cors: {
			origin: (origin, callback) => {
				console.log('origin', origin);

				if (!origin || WHITE_LIST.includes(origin)) {
					callback(null, true);
				} else {
					callback(new Error('Not allowed by CORS'));
				}
			},
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
			const { roomId } = messageData;
			await socket.to(messageData.roomId).emit('receive_message', messageData);
			writeMessage(roomId, messageData);
		});

		socket.on('disconnect', () => {
			console.log(`User ${id} disconnected.`);
		});
	});
};

module.exports = { initSocket };
