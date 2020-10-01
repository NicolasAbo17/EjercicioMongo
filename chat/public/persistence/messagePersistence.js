var messageLogic = require("../logic/messageLogic.js");
const Message = require("../models/Message");

function postMessage(message) {
  const { error } = messageLogic.validateMessage(message.body);
  if (error) {
    return error;
  }

  return Message.create({
    author: message.author,
    message: message.message,
    ts: new Date().getTime(),
  }).then((response) => {
    return response;
  });
}

function getMessages() {
  return Message.findAll().then((result) => {
    return result;
  });
}

exports.postMessage = postMessage;
exports.getMessages = getMessages;
