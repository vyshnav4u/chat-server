const express = require('express');
const { getMessages } = require('../controller/messages/message.controller');

const messageRoute = express.Router();
//todo: change roomId -> chatId
messageRoute.get('/:roomId', getMessages);

module.exports = messageRoute;
