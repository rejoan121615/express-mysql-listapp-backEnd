require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./database/database");

// models
const UserModel = require("./model/UserModel");

// app variables
const app = express();
const port = process.env.PORT || 5000;

// session Configuration
const session = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false,
};

if (app.get("env") === "production") {
    session.cookie.secure = true;
}

// passport Configuration

// app Configuration

// routers
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
app.use("/", (req, res, next) => {
    res.status(404).json({ message: "No routes avaialble" });
});

sequelize
    .sync()
    .then((data) => {
        // console.log(data);
        app.listen(port, () => {
            console.log(
                `database stablished application on http://localhost:${port}`
            );
        });
    })
    .catch((error) => {
        console.log("database connection fail, application not started");
    });
