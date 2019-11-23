var express = require('express');
var cookieParser = require('cookie-parser');
var router = express.Router();
router.use(cookieParser());




router.get('/', function(req, res, next) {
 	res.render('index', { address: req.cookies.private_key });
});




router.post('/', function(req, res, next) {
 	res.render('index', { address: req.cookies.private_key });
});




module.exports = router;
