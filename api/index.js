const express = require('express');
const http = require('http');
const cors = require('cors');
const { initSocket } = require('./controller/socketOperation');
const { readMessages } = require('./model/messages.model');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/product', (req, res) => {
	res.status(200).json({ test: 'sucess' });
});

const server = http.createServer(app);
initSocket(server);
// readMessages();

server.listen(8000, () => {
	console.log('Server started...');
});

module.exports = app;
