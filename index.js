// Main starting point of the application; includes dependencies

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();  //creates an instance of the application

// App Setup - get express working




// Server Setup - get express to talk to outside world

const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
