//Melody marks , czkrok
const cookieParser = require('cookie-parser')
require('dotenv').config();
const express = require('express');
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web')
const apiRoutes = require('./routes/api')
const app = express();// app press
const port = process.env.PORT || 8888;// port
const hostname = process.env.HOST_NAME;
const configcors = require('./config/cors');


// Add headers before the routes are defined
configcors(app);
//config require body
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({extended:true})); //Parse URL-encoded bodies

// config view engine
configViewEngine(app);

//config body parser
app.use(cookieParser());
//Khai bao rote
app.use('/', webRoutes);

app.use('/api/',apiRoutes);
 // test connection
// conectDBORM();

///
app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})