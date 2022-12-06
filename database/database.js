const mysql = require("mysql2");

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "match-record",
    password: "",
    connectionLimit: 40,
});

module.exports = pool.promise();
