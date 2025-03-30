const fs = require('fs');
const path = require('path');

// Example usage:
const newMessage = {
	messageId: 'unique-message-id-789',
	senderId: 'user-id-101',
	groupId: 'group-id-abc',
	timestamp: '2023-10-27T10:05:00Z',
	content: 'Meeting starting in 5 minutes!',
	type: 'text',
};

// saveMessage(newMessage);

const readMessages = () => {
	try {
		const filePath = path.join(
			__dirname,
			'..',
			'..',
			'src',
			'db',
			'messages.json'
		);
		console.log('filePath', filePath);
		const data = fs.readFileSync(filePath, 'utf8');
		const messageData = JSON.parse(messageData);

		return messageData;
	} catch (error) {
		console.error('Error reading or parsing message.json:', error);
		return null; // Or throw an error, depending on your error handling strategy
	}
};

module.exports = { readMessages };
