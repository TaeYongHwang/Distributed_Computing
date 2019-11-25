pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

//for all users.
contract ICarTrade  {
    
    mapping (address => string) internal address_name;
    mapping (uint => Car) internal num_car;
    mapping (uint => Order) internal num_order;
    Car[] cars; //all of cars
    Order[] orders; //all of orders
    Car[] myCars;
    uint unique_number = 1;
    
    struct Car{
        uint number; //unique
        string owner_name; 
        string make;
        string model;
        string color;
        address payable owner;
    }
    struct Order{
        Car car;
        uint price;
        string status;
    }
    
    function registerCar(string memory make, string memory mode, string memory color) public{
        cars.push(Car(unique_number,address_name[msg.sender], make, mode, color, msg.sender));
        myCars.push(Car(unique_number,address_name[msg.sender], make, mode, color, msg.sender));
        num_car[unique_number] = cars[cars.length-1];
        unique_number++;
    }
    function registerName(string memory name) public{ //updating name
        address_name[msg.sender] = name;
        for(uint i = 0 ; i<cars.length; i++){
            if(cars[i].owner == msg.sender)
                cars[i].owner_name = name;
        }
        for(uint i = 0 ; i<orders.length; i++){
            if(orders[i].car.owner == msg.sender)
                orders[i].car.owner_name = name;
        }
        for(uint i = 0 ; i<myCars.length; i++){
            myCars[i].owner_name = name;
        }
        
    }
    function sellMyCar(uint cnumber, uint price) public{
        require(cnumber>0);
        require(msg.sender == num_car[cnumber].owner);
        orders.push(Order(num_car[cnumber] , price ,"sale"));
        num_order[cnumber] = orders[orders.length-1];
    }
    function buyUserCar(uint orderedcnumber) payable public{
        //1. send ether to car owner
        balanceTransfer(num_order[orderedcnumber].car.owner, num_order[orderedcnumber].price);
        //2. change car owner
        changeCarOwner(orderedcnumber, msg.sender);
        //3. change sale -> done
        num_order[orderedcnumber].status = "done";
    }
    function balanceTransfer(address payable seller, uint price) payable public{
        require(msg.sender.balance >= price);
        require(seller != address(0));
        seller.transfer(price*(10**18));
    }
    function changeCarOwner(uint cnumber, address payable addr) payable public{
        require(addr != address(0));
        for(uint i = 0 ; i<cars.length; i++){
            if(cars[i].number == cnumber){
                cars[i].owner = addr;
                cars[i].owner_name = address_name[addr];
                break;
            }
        }
        for(uint i = 0 ; i<orders.length; i++){
            if(orders[i].car.number ==cnumber){
                orders[i].car.owner = addr;
                orders[i].car.owner_name = address_name[addr];
                orders[i].status = "done";
                break;
            }
        }
        setMyCars();
    
    }
    function getMyCars() public view returns(Car[] memory){
        return myCars;
    }
    //called when server is started and cur_user changed 
    function setMyCars() public {
        myCars.length = 0;
        for(uint i = 0 ; i<cars.length; i++){
            if(cars[i].owner == msg.sender){
                myCars.push(cars[i]); 
            }
        }
    }
    function getName() public view returns(string memory){
        return address_name[msg.sender];
    }
    function getAllRegisteredCar() public view returns(Car[] memory){
        return cars;
    }
    function getAllOrderedCar() public view returns(Order[] memory){
        return orders;
    }
    //have to make it print 'ether';
    function getBalance(address user) public view returns(uint256){ 
        return user.balance ;
    }    
    function getPrice(uint cnumber) public view returns(uint){
        return num_order[cnumber].price;
    }
    function isOrder(uint cnumber) public view returns(bool){
        if(num_order[cnumber].car.number == cnumber){
            return true;
        } else{
            return false;
        }    
        
    }
    function compareStrings (string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
       }
}









