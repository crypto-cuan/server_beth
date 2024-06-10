#!/usr/bin/env node

/**
 * Module dependencies.
 */

// var app = require('../app');
// var debug = require('debug')('task-management-system:server');
// var http = require('http');
import app from '../app';
import debugLib from 'debug';
import http from 'http';
const debug = debugLib('task_management_system:server');

import connectSocket from '../socket/crypto/cryptoSocket'

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '4010');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

const cryptoServer = app.listen(port, (req,res) => {
  console.log(`This server is running on port: ${port}`)
})
server.on('error', onError);
server.on('listening', onListening);
// connectSocket(cryptoServer)

const io = require('socket.io')(cryptoServer);

const releaseData = () => {
  setInterval(() => {
      io.emit('message', "cihuy");
  }, 3000);
  // releaseData()
}

io.on('connection', function(socket) {
  console.log(socket.id)
  socket.on('SEND_MESSAGE', function(data) {
    console.log("data from client: ", data);
      io.emit('MESSAGE', data)
  });
    // io.emit('BINANCE', "HELLO")

  // setInterval(() => {
  //   io.emit('BINANCE', "HELLO")
  // }, 3000);


  // socket.on('SEND_BINANCE', function(data) {
  //   console.log("data from client: ", data);
  //     io.emit('BINANCE', data)
  // });
  // releaseData()
  // socket.timeout(5000).emit("my-event", (err) => {
  //   // if (err) {
  //   //   // the other side did not acknowledge the event in the given delay
  //   // }
  //   io.emit('MESSAGE', "ahsyap")

  // });
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
