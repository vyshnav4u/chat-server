const express = require('express');
const http = require('http');
const cors = require('cors');
const { initSocket } = require('./controller/socketOperation');
const messageRoute = require('./routes/message.route');
const { WHITE_LIST } = require('./constants/clientInfo');

const app = express();
app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin || WHITE_LIST.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		},
		methods: ['GET', 'POST', 'OPTIONS'],
	})
);
app.use(express.json());

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
