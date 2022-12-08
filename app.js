const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./database/database");
// models
const UserModel = require('./model/UserModel');

// router
const app = express();
const UsersRoute = require("./router/UserRoute");

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});

// register router
app.use(UsersRoute);

sequelize.sync()
    .then((data) => {
        // console.log(data);
        app.listen(3005, () => {
            console.log(
                "database stablished application on http://localhost:3005"
            );
        });
    })
    .catch((error) => {
        console.log("database connection fail, application not started");
    });
