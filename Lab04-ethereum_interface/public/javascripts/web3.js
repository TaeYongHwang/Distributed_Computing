var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'));
const contract_address = "0xd79913A340b1D0803FBd40F92bd99a08ae2e516d";
const abi =
[
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "cnumber",
				"type": "uint256"
			}
		],
		"name": "isOrder",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "registerName",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "orderedcnumber",
				"type": "uint256"
			}
		],
		"name": "buyUserCar",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getMyCars",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "number",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "owner_name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "make",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "model",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "color",
						"type": "string"
					},
					{
						"internalType": "address payable",
						"name": "owner",
						"type": "address"
					}
				],
				"internalType": "struct ICarTrade.Car[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "setMyCars",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllOrderedCar",
		"outputs": [
			{
				"components": [
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "number",
								"type": "uint256"
							},
							{
								"internalType": "string",
								"name": "owner_name",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "make",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "model",
								"type": "string"
							},
							{
								"internalType": "string",
								"name": "color",
								"type": "string"
							},
							{
								"internalType": "address payable",
								"name": "owner",
								"type": "address"
							}
						],
						"internalType": "struct ICarTrade.Car",
						"name": "car",
						"type": "tuple"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "status",
						"type": "string"
					}
				],
				"internalType": "struct ICarTrade.Order[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllRegisteredCar",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "number",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "owner_name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "make",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "model",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "color",
						"type": "string"
					},
					{
						"internalType": "address payable",
						"name": "owner",
						"type": "address"
					}
				],
				"internalType": "struct ICarTrade.Car[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "cnumber",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "changeCarOwner",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "make",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "mode",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "color",
				"type": "string"
			}
		],
		"name": "registerCar",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address payable",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "balanceTransfer",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "cnumber",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "sellMyCar",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "cnumber",
				"type": "uint256"
			}
		],
		"name": "getPrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
const admin_address =  "0xf85575b7caa9113bf8c106d90ff98b463c8b8adc"

let carTrade = new web3.eth.Contract(abi, contract_address);

var cur_user = admin_address; //default;

$(document).ready(function() {
	startDapp();
})

var startDapp = async function() {


	if(!getCookie("private_key")){ //null check
	  //save cookie
	  setCookie("private_key", admin_address, 10);
	} 

	cur_user = getCookie("private_key");

	console.log(cur_user);	
	await getRegisteredCars();
	await getMyCars();
	await getCarsOnSale();	
	await getBuyUsersCar();
	await getSellMyCars();
	await getBalance();
	await getName();
}

var setCookie = function(name, value, day) {
    var date = new Date();
    date.setTime(date.getTime() + day * 60 * 60 * 24 * 1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
}


var getCookie = function(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
}

var getBalance = async function() { 
	html = "";
	var my_balance = await carTrade.methods.getBalance(cur_user).call({from:cur_user, gas: 5000000});	
	html += my_balance/(10**18);
	document.getElementById('balanceAmount').innerHTML = html;
}

var getName = async function() {
	html = "";
	html = await carTrade.methods.getName().call({from:cur_user});
	document.getElementById('name').innerHTML = html;
	
}

var registerName = async function() {

	var value = document.getElementById('change_name').value;
	await carTrade.methods.registerName(value).send({from : cur_user, gas:5000000});
	await getName();

}

var changeUser = async function() {
	cur_user = await document.getElementById('private_key').value;
	setCookie("private_key", cur_user, 1);
	await carTrade.methods.setMyCars().send({from:cur_user, gas:5000000});

	await getBalance();
	await getName();
	await getMyCars();
	

}

var registerMyCar = async function() {
	var make =  document.getElementById("make").value;
	var model =  document.getElementById("model").value;
	var color =  document.getElementById("color").value;
    setCookie("make",make,1);
    setCookie("model",model,1);
    setCookie("color",color,1);		
	await carTrade.methods.registerCar(make,model,color).send({from:cur_user, gas:5000000}); 

}

var sellMyCar = async function() {
	//store unique car number
	var selectedCarNum =  document.getElementById("mycars-category").value;
	var price = document.getElementById("price").value;
	setCookie("mycars-category", selectedCarNum, 1);

	await carTrade.methods.sellMyCar(selectedCarNum,price).send({from:cur_user, gas:5000000});
	//getCarsOnSale();
		
}

var buyUserCar = async function() {
	var selectedCarNum =  document.getElementById("sale-category").value;
	var price = await carTrade.methods.getPrice(selectedCarNum).call({from:cur_user});
	await carTrade.methods.buyUserCar(selectedCarNum).send({from:cur_user, gas:5000000, value: price*(10**18)});
	setCookie("buyusercar",selectedCarNum, 1); 
}

var getMyCars = async function() {

//fill My Cars' table
	$('#myCars').empty();	
	var carArr = new Array();
	carArr = await carTrade.methods.getMyCars().call({from:cur_user});
	console.log(carArr);	

	for(var i = 0 ; i<carArr.length; i++){
	  var tuple = "<tr>";
	  for(var j = 0 ; j<5; j++){
		tuple += "<td>";
		tuple += carArr[i][j];
	    tuple += "</td>";
	  }	
	tuple+= "</tr>"
	$('#myCars').append(tuple);	
	
	}

}

var getRegisteredCars = async function() {
	$('#registeredCars').empty();	
	var carArr =new Array();
	carArr = await carTrade.methods.getAllRegisteredCar().call({from:cur_user});
	
	console.log(carArr);
	
	for(var i = 0 ; i<carArr.length; i++){
	  var tuple = "<tr>";
	  for(var j = 0 ; j<5; j++){
		tuple += "<td>";
		tuple += carArr[i][j];
	    tuple += "</td>";
	  }	
	tuple+= "</tr>"
	$('#registeredCars').append(tuple);	
	
	}

}

var getSellMyCars = async function() {
	var carArr = new Array();
	carArr = await carTrade.methods.getMyCars().call({from:cur_user});
//fill Sell My Car's list
   $('#mycars-category').empty();
   for(var i = 0 ; i<carArr.length; i++){
	 var isOrder = await carTrade.methods.isOrder(carArr[i][0]).call({from:cur_user});
	 if(isOrder){ continue; }
	var option = '<option value =' + carArr[i][0] + '>' ;
	for(var j = 0 ; j<5; j++){
	  option += carArr[i][j];
	  option +=" ";
    }
	$('#mycars-category').append(option);	
	option += "</option>"
   }
}

var getCarsOnSale = async function() {
	$('#carsOnSale').empty();	
	var saleArr = new Array();
	saleArr = await carTrade.methods.getAllOrderedCar().call({from:cur_user});
	console.log(saleArr);	

	for(var i = 0 ; i<saleArr.length; i++){

	  var tuple = "<tr>";
	  for(var j = 0 ;j<5; j++){
		tuple += "<td>";	
		tuple += saleArr[i][0][j];
		tuple += "</td>";
	  }
		tuple += "<td>";
		tuple += saleArr[i][1];	
		tuple += "</td>";
		tuple += "<td>";
		tuple += saleArr[i][2];	
		tuple += "</td>";
	  tuple+="</tr>"
	  $('#carsOnSale').append(tuple);	
	  
	}

}

var getBuyUsersCar = async function() {
	var $saleArr = new  Array();
	saleArr = await carTrade.methods.getAllOrderedCar().call({from:cur_user});
//fill Buy Users Car

   $('#sale-category').empty();
   for(var i = 0 ; i<saleArr.length; i++){
	if(saleArr[i][2] == "done"){
		continue;
	}
	var option = '<option value =' + saleArr[i][0][0]+ '>' ;
	for(var j = 0 ; j<5; j++){
	  option += saleArr[i][0][j];
	  option +=" ";
    }
	option += saleArr[i][1];
	$('#sale-category').append(option);	
	option += "</option>"
   }

}

