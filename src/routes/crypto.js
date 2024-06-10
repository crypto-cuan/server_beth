var express = require('express');
var router = express.Router();
import { 
  cryptoCheck,
  cryptoGetAll,
  binanceGetBalance,
  binanceGetCurrentPositionMode,
  binanceGet24hrChangeStatististics,
  binanceKlinesCandlestick,
  binanceCheckServerTime,
  binanceCandlestickNewyorkOpen,
  binanceBookFuture,
  binanceBookFutureTest,
  findPresentMarkTradeFutures,
  binanceKlinesFutures,
} from '../controller/cryptoController';
 
import { 
  createWeb3Object,
  createWeb3Account,
  getAccountBalance,
  getBlockNumber,
  getBlock,
  createContract,
 } from '../controller/ethController';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/check', cryptoCheck)
router.get('/binance/futures/balance', binanceGetBalance)
router.get('/binance/futures/klines', binanceKlinesFutures)
router.get('/binance/futures/currentPosition', binanceGetCurrentPositionMode)
router.get('/binance/futures/statistic24hr', binanceGet24hrChangeStatististics)
router.get('/binance/futures/checkServerTime', binanceCheckServerTime)
router.get('/binance/futures/klines', binanceKlinesCandlestick)
router.get('/binance/futures/klines/newyork', binanceCandlestickNewyorkOpen)
router.post('/binance/futures/submitOrder', binanceBookFuture)
router.post('/binance/futures/submitOrder/test', binanceBookFutureTest)
router.post('/binance/futures/presentMarkTradeFutures', findPresentMarkTradeFutures)
// router.get('/check', cryptoCheck)

router.get('/eth/network/createObject', createWeb3Object)
router.get('/eth/account/createAccount', createWeb3Account)
router.post('/eth/account/accountBalance', getAccountBalance)
router.get('/eth/blockchain/blockNumber', getBlockNumber)
router.post('/eth/blockchain/block', getBlock)
router.post('/eth/contract/create', createContract)

router.get('/socket.io-client', function(req, res, next) {
  res.send('respond with a resource');
});


module.exports = router;
