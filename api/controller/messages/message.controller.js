const { readMessages } = require('../../model/messages.model');

//todo: add limit and skip
const getMessages = (req, res) => {
	const { params } = req;
	const { roomId } = params;
	console.log('params', params);

	const messages = readMessages();
	res.status(200).json({ messages: messages?.[roomId] ?? [] });
};

module.exports = { getMessages };
