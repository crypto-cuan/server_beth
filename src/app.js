process.env.NODE_ENV = process.env.NODE_ENV || 'development';
require('dotenv').config()
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
// import { markTransactionPer5Sec, markTransactionPerSecond, newyorkMarketOpen, newyorkMarketClose, testNodeCron, testNodeCron2 } from './cron/cryptoCron';
// import { connectStreamFutureBinance, priceStreamFutures } from './helpers/crypto'

var app = express();
app.use(logger('dev'));
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', indexRouter);
// app.use('/users', usersRouter);

// process.on('unhandledRejection', (err) => {
//     debugError(err.message)
//   })
  
  // console.log( "env path: ", process.env.PATH );
  // console.log("== env: ", process.env);
  // console.log("== env: ", process.env.NODE_ENV);
  // console.log("== env: ", process.env.APP_PORT);
//   const { Client } = require('pg')
  
//   const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false
//     },
//     keepAlive: true,
//   })

// console.log("client: ", client);
// console.log("user: ", client.user);
// console.log("db: ", client.database);
// console.log("port: ", client.port);
// console.log("host: ", client.host);
  

// client.connect()
//   .then((val) => {
//     console.log('== connected', val)
//   })
//   .catch((err) => {
//     console.log('== err client', err)
//   })
  

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// const WebSocket = require('ws');
// const binanceWS = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade')

// const server = new WebSocket.Server({ port: 5002 });

// server.on('connection', function connection(ws){
//     console.log("Connected a new client");

//   });

//   server.on('closed', function (id){
//     console.log("connection closed");
//     console.log(id);
//   });

//   server.on('error', function (err){
//     console.log(err)
//   })

// //websocket connection event will return a socket you can later use

// binanceWS.on("open", function() {
//  console.log("connected to Binance");

// });


// binanceWS.on('message', function(data){
//   console.log(data);
//  server.clients.forEach(function each(client) {
//   if (client.readyState === WebSocket.OPEN) {
//     client.send(data);
//   }
//  });   
// })

// stream spot
// connectStreamFutureBinance()

// stream futures
// priceStreamFutures()


// cron
// markTransactionPerSecond().start();
// markTransactionPer5Sec().start();
// markTransactionPerSecond();
// markTransactionPer5Sec();
// newyorkMarketOpen()
// newyorkMarketClose()
// testNodeCron()
// testNodeCron2()

export default app;
