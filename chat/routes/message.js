var express = require("express");
var router = express.Router();

var [  getMessages,  postMessage,  getMessage,  putMessage,  deleteMessage] = require("../public/controllers/messageController");
var messageLogic = require("../public/logic/messageLogic");

const ws = require("../wslib");

router.get("/api/messages", function (req, res, next) {
  const messages = await getMessages();
  res.send(messages);
});

router.post("/api/messages/create", function (req, res, next) {
  const { error } = messageLogic.validateMessage(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  req.body["ts"] = new Date().getTime();
  const newMessage = await postMessage(req.body);
  ws.sendMessages();
  res.send(newMessage.ops[0]);

});

router.get("/api/messages/:ts", (req, res) => {
  const message = await getMessage(req.params.ts);
  if (message === null) {
    return res.status(404).send("The message with the given ts was not found.");
  } 
  return res.send(message);
});

router.put("/api/messages", (req, res) => {
  const { error } = messageLogic.validateMessage(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  const message = await getMessage(req.body.ts);
  if(message === null) 
    res.status(404).send({ message: "Message was not found" });
  else {
    req.body.message += " (EDITED, last ts:" + req.body.ts + ")";
    oldTs = req.body.ts;
    req.body.ts = new Date().getTime();

    updated = await putMessage(req.body, oldTs);
    ws.sendMessages();
    return res.send(req.body);
  }
});

router.delete("/api/messages/delete/:ts", (req, res) => {
  const message = await getMessage(req.params.ts);
  if(message === null) 
    res.status(404).send({ message: "Message was not found" });
  else{
    removed = await deleteMessage(req.params.ts);
    ws.sendMessages();
    return res.send(message);
  }
});

module.exports = router;
