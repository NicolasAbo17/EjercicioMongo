var express = require("express");
var router = express.Router();

var messageLogic = require("../public/logic/messageLogic");
const ws = require("../wslib");
const Message = require("../public/models/message");

router.get("/api/messages", function (req, res, next) {
  Message.findAll().then((result) => {
    res.send(result);
  });
});

router.post("/api/messages/create", function (req, res, next) {
  const { error } = messageLogic.validateMessage(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Message.create({
    message: req.body.message,
    author: req.body.author,
    ts: req.body.ts,
  }).then((result) => {
    res.send(result);
  });
});

router.get("/api/messages/:ts", (req, res) => {
  Message.findOne({
    where: {
      ts: messageTs,
    },
  }).then((response) => {
    if (response === null)
      return res
        .status(404)
        .send("The message with the given ts was not found.");
    res.send(response);
  });
});

router.post("/api/messages/create", (req, res) => {
  const { error } = messageLogic.validateMessage(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Message.create({
    message: req.body.message,
    author: req.body.author,
    ts: req.body.ts,
  }).then((result) => {
    res.send(result);
  });
});

router.put("/api/messages", (req, res) => {
  const { error } = messageLogic.validateMessage(req.body);

  if (error) {
    return res.status(400).send(error);
  }

  Message.update(req.body, {
    where: {
      ts: messageTs,
    },
  }).then((response) => {
    if (response[0] !== 0) res.send({ message: "Message updated" });
    else res.status(404).send({ message: "Message was not found" });
  });
});

router.delete("/api/messages/delete/:ts", (req, res) => {
  Message.destroy({
    where: {
      ts: messageTs,
    },
  }).then((response) => {
    if (response === 1) res.status(204).send();
    else res.status(404).send({ message: "Message was not found" });
  });
});



module.exports = router;
