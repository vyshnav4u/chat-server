const express = require('express');
const http = require('http');
const cors = require('cors');
const { initSocket } = require('./controller/socketOperation');
const messageRoute = require('./routes/message.route');
const { CLIENT_URI } = require('./constants/clientInfo');

const app = express();
app.use(
	cors({
		origin: CLIENT_URI,
		methods: ['GET', 'POST', 'OPTIONS'],
	})
);
app.use(express.json());

// Explicitly handle OPTIONS requests
app.options('*', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', CLIENT_URI);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Add any headers you might be using
	res.setHeader('Access-Control-Allow-Credentials', 'true'); // If needed
	res.status(204).end();
});

app.use('/api/v1/messages', messageRoute);

const server = http.createServer(app);
initSocket(server);

server.listen(8000, () => {
	console.log('Server started...');
});

module.exports = app;

/*
	VISION
	------
	- Create an instant chat app including text, audio, video, screen share without tracking person
	- A User can join without providing any details to chat room,
	- store created userId and nick name in local-storage
	- store and read last used chat room from local-storage

	PRO
	---
	- User can set custom expiry date for chat upto 30 days.
	- by default it will be 1 day
*/

/*
	TODO:
	1. From front end one person can share meeting link and another person
		can join as dummy user

	2. Gmail Integration in login

	3. Sent Photos

	4. Implement infinite scroll upward in frontend message

	5. Add code editor

	6. convert this to typescript before too late

	7. Add Message encryption

	v2
	----
	1. Ability to record video and download video
	
*/
