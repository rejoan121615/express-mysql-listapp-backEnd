const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    database: "match-record",
    username: "root",
    password: "121615",
    host: "127.0.0.1",
    dialect: 'mysql',
    
});

module.exports = sequelize;
