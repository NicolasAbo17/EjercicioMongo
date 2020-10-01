const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Message extends Model {}

Message.init(
  {
    message: {
        type: DataTypes.TEXT,
        
    },
    author: {
        type: DataTypes.STRING,
        
    },
    ts: {
        type: DataTypes.INTEGER,
        
    },
  },
  { sequelize, modelName: "Message" }
);

Message.sync();

module.exports = Message;