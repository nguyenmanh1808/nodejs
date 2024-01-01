//Melody marks , czkrok
require('dotenv').config();
const express = require('express');
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web')
const connection = require('./config/DB');

const app = express();// app press
const port = process.env.PORT || 8888;// port
const hostname = process.env.HOST_NAME;

//config require body
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies

// config view engine
configViewEngine(app);


//Khai bao rote
app.use('/', webRoutes);


// test connection



///
app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})