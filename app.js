const express = require("express");
const database = require("./database/database");

// router
const UsersRoute = require("./router/Users");

const app = express();


// register router 
app.use(UsersRoute);


app.listen(3005, () => {
    console.log("node js started on http://localhost:3005");
});
