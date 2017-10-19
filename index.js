// Main starting point of the application; includes dependencies

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();  //creates an instance of the application
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

// DB Setup
mongoose.connect('mongodb://localhost:auth/auth');


// App Setup - get express working; Morgan is middleware in express (incoming requests will pass thru morgan/bodyParser)
//Morgan is a logging framework; logs incoming requests, helps with debugging
//BodyParser middleware used to parse incoming requests; used to parse into JSON
//Nodemon installed to watch for file changes

app.use(morgan('combined'));
app.use(cors());//you can specify a specific api or site
app.use(bodyParser.json({ type: '*/*' }));
router(app);



// Server Setup - get express to talk to outside world

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
