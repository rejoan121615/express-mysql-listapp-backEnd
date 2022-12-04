const express = require('express');


// router 
const UsersRoute = require('./router/Users');



const app = express();




app.use(UsersRoute);





app.listen(3005, () => {
  console.log('node js started on http://localhost:3005')
})