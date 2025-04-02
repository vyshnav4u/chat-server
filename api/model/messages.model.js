const fs = require('fs');
const path = require('path');

const readMessages = () => {
	try {
		const filePath = path.join(
			__dirname,
			'..',
			'..',
			'api',
			'db',
			'messages.json'
		);
		const data = fs.readFileSync(filePath, 'utf8');
		const messageData = JSON.parse(data);

		return messageData;
	} catch (error) {
		console.error('Error reading or parsing message.json:', error);
		return null; // Or throw an error, depending on your error handling strategy
	}
};

const writeMessage = (key, data) => {
	try {
		const allMessages = readMessages();
		const filePath = path.join(
			__dirname,
			'..',
			'..',
			'api',
			'db',
			'messages.json'
		);
		const currentData = allMessages[key] ?? [];
		currentData.push(data);
		allMessages[key] = currentData;

		fs.writeFileSync(filePath, JSON.stringify(allMessages, null, 2), 'utf8');
	} catch (error) {
		console.error('Error writing file:', error);
	}
};

module.exports = { readMessages, writeMessage };
