const { readMessages } = require('../../model/messages.model');

const getMessages = (req, res) => {
	const { params, query } = req;
	const { roomId } = params;
	const { limit = 20, skip = 0 } = query;

	const messages = readMessages();
	const currentMessages = messages?.[roomId] ?? [];
	const maxMessage = currentMessages.length;
	const total = currentMessages.length;
	const endIndex = total - skip;
	const startIndex = Math.max(0, endIndex - limit);

	if (skip >= maxMessage)
		return res.status(200).json({
			messages: [],
			total,
			skip: total,
			limit: 0,
		});

	const responseMessage = currentMessages.slice(startIndex, endIndex);

	res.status(200).json({
		messages: responseMessage,
		total,
		skip: Number(skip),
		limit: Number(limit),
	});
};

module.exports = { getMessages };
