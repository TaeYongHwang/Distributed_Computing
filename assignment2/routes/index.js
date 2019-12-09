var express = require('express');
var enroll = require('../fabric_js/enrollAdmin.js')
var register = require('../fabric_js/registerUser.js')
var query = require('../fabric_js/query.js')
var invoke = require('../fabric_js/invoke.js')
var router = express.Router();


let user;




/* GET home page. */
router.get('/',async function(req, res, next) {
	console.log('main page')
	console.log(req.cookies.user)

	var user = req.cookies.user;
	var myCar, registeredCar ,orderedCar;	


	if(req.cookies.user !=null){

 		myCar =await query.query(user, 'getMyCar');	

		registeredCar = await query.query(req.cookies.user, 'getAllRegisteredCar');
		orderedCar = await query.query(req.cookies.user, 'getAllOrderedCar');

		if(Object.keys(registeredCar).length == 0)
			registeredCar = null;
		if(Object.keys(orderedCar).length == 0)
			orderedCar = null;

	}

 	res.render('index', { name: user, myCar : myCar,
						  registeredCar : registeredCar, orderedCar : orderedCar
							});
});

router.get('/enrollAdmin', async function(req, res, next) {
	await enroll.enrollAdmin();
	res.redirect('/');
});

router.post('/registerUser', async function(req, res, next) {
	user = req.body.user;
	console.log(user);
	await register.registerUser(user);
	res.cookie('user', user);

	res.redirect('/');
});

router.post('/registerMyCar', async function(req, res, next){
	console.log('registerMyCar');
	user = req.cookies.user;
	make = req.body.make;
	model = req.body.model;
	color = req.body.color;
	
	var args = {};
	args['make'] = make;
	args['model'] = model;
	args['color'] = color;
	
	
//------------invoke-------
	await invoke.invoke(user,'registerCar' ,args );
	res.redirect('/');	


});

router.post('/sellMyCar', async function(req, res, next){

	var owner = req.cookies.user;
	console.log('sellMyCar');
	console.log(req.body['demo-category']);
	console.log("---");
//------------invoke--------
	await invoke.invoke(owner, 'sellMyCar');

	res.redirect('/');	
});

router.post('/buyUserCar', async function(req, res, next){
	console.log('buyUserCar');
	selectedCar = req.body['demo-category'];
	console.log(selectedCar);

//------------invoke--------
	await invoke.invoke(user, 'buyUserCar', selectedCar);

	res.redirect('/');	


});
// example, how to use json object in router
// router.post('/query', async function(req, res, next) {
// 	console.log('name : ', user)
// 	var result = await query.query(req.cookies.user)
// 	console.log('result : ', result)
// 	console.log('make : ', result['make'])

// 	res.redirect('/');
// })


module.exports = router;
