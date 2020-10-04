const mdbconn = require("../../lib/utils/mongo.js");

function getMessages() {
  return mdbconn.conn().then((client) => {
    return client.db("chat").collection("messages").find({}).toArray();
  });
}

function postMessage(message) {
  return mdbconn.conn().then((client) => {
    return client.db("chat").collection("messages").insertOne(message);
  });
}

function getMessage(ts) {
  return mdbconn.conn().then((client) => {
    return client
      .db("chat")
      .collection("messages")
      .findOne({ ts: parseInt(ts) });
  });
}

function putMessage(body, oldTs) {
  return mdbconn.conn().then((client) => {
    client
      .db("chat")
      .collection("messages")
      .updateOne(
        { ts: oldTs },
        {
          $set: {
            author: body.author,
            message: body.message,
            ts: parseInt(body.ts),
          },
        }
      );
  });
}

function deleteMessage(ts) {
  return mdbconn.conn().then((client) => {
    client
      .db("chat")
      .collection("messages")
      .deleteOne({ ts: parseInt(ts) });
  });
}

module.exports = [  getMessages,  postMessage,  getMessage,  putMessage,  deleteMessage];
