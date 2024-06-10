var express = require('express');
var router = express.Router();
import { listEvent } from '../controller/eventController';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/list', listEvent)

module.exports = router;
