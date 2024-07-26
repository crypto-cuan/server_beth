var express = require('express');
var router = express.Router();
import eventRouter from './event';
import cryptoRouter from './crypto'
import bethRouter from './beth'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// router.use('/event', eventRouter)
router.use('/crypto', cryptoRouter)
router.use('/beth', bethRouter)

module.exports = router;
