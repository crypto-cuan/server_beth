var express = require('express');
var router = express.Router();
import eventRouter from './event';
import cryptoRouter from './crypto'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// router.use('/event', eventRouter)
router.use('/crypto', cryptoRouter)

module.exports = router;
