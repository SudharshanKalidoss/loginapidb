const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('./routes/user.routes');

const app = express();
const port = 3000;



app.use(bodyParser.json());

app.use('/',userRoute);


app.listen(port,()=>{
    console.log('Server is running  successfully')
});