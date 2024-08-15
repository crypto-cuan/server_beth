var express = require('express');
var router = express.Router();

import {
  listProduct,
  checkConnection,
  getAccountBalance,
  walletCheck,
  getTransactionByAccount,
  getBlocks,
  getTransactionDetailByHash,
  getListTransactions,
  getTransactionReceipt,
  getBlock,
  getTransactionMoralis,
  getBlockCount,
  getBalance,
  checkValidAddress,
  getTransactionList,
  getTransactionByHash,
  sendTransaction,
  getAverageGasUsed,
  getDailyTotalGasUsed,
} from '../controller/bethController'
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/connectionStatus', checkConnection)
// router.post('/getBalance', getAccountBalance)
router.post('/walletCheck', walletCheck)
router.get('/getTransactionByAccount', getTransactionByAccount)
router.post('/getTransactionDetailByHash', getTransactionDetailByHash)
router.post('/getListTransactions', getListTransactions)
router.post('/getTransactionReceipt', getTransactionReceipt)
router.post('/getTransactionMoralis', getTransactionMoralis)
router.post('/getBlock', getBlock)
router.get('/getBlockCount', getBlockCount)
router.get('/getBlocks', getBlocks)
router.post('/getBalance', getBalance)
router.post('/checkValidAddress', checkValidAddress)
router.post('/getTransactionList', getTransactionList)
router.post('/getTransactionByHash', getTransactionByHash)
router.post('/sendTransaction', sendTransaction)
router.get('/getAverageGasUsed', getAverageGasUsed)
router.get('/getDailyTotalGasUsed', getDailyTotalGasUsed)

router.get('/listProduct', listProduct)
// router.post('/binance/futures/submitOrder', binanceBookFuture)


module.exports = router;
