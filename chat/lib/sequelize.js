const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("database", "", "", {
  dialect: "sqlite",
  storage: "../public/database/database.sqlite",
});

sequelize.authenticate().then(() => {
  console.log("Authenticated!");
});

module.exports = sequelize;