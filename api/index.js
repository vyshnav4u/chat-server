const express = require('express');
const http = require('http');
const cors = require('cors');
const { initSocket } = require('./controller/socketOperation');
const messageRoute = require('./routes/message.route');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/messages', messageRoute);

const server = http.createServer(app);
initSocket(server);

server.listen(8000, () => {
	console.log('Server started...');
});

module.exports = app;

/*
	TODO:
	1. From front end one person can share meeting link and another person
		can join as dummy user

	2. Gmail Integration in login

	3. Sent Photos

	4. Implement infinite scroll upward in frontend message
*/
