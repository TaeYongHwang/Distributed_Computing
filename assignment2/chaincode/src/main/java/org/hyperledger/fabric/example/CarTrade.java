/*
Copyright IBM Corp., DTCC All Rights Reserved.

SPDX-License-Identifier: Apache-2.0
*/
package org.hyperledger.fabric.example;

import java.util.ArrayList;
import java.util.List;

import com.google.protobuf.ByteString;
import io.netty.handler.ssl.OpenSsl;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hyperledger.fabric.shim.ChaincodeBase;
import org.hyperledger.fabric.shim.ChaincodeStub;
import org.hyperledger.fabric.shim.ChaincodeException;
import org.hyperledger.fabric.shim.ledger.KeyValue;
import org.hyperledger.fabric.shim.ledger.QueryResultsIterator;

import static java.nio.charset.StandardCharsets.UTF_8;
import com.owlike.genson.Genson;
import com.owlike.genson.GensonBuilder;

public class CarTrade extends ChaincodeBase {

    private static Log _logger = LogFactory.getLog(CarTrade.class);
    private final Genson genson = new GensonBuilder()
  .useIndentation(true)
  .useRuntimeType(true)
  .useConstructorWithArguments(true)
  .create();

    @Override
    public Response init(ChaincodeStub stub) {
        try {
            String func = stub.getFunction();
            if (!func.equals("init")) {
                return newErrorResponse("function other than init is not supported");
            }
            return newSuccessResponse();
        } catch (Throwable e) {
            return newErrorResponse(e);
        }
    }

    @Override
    public Response invoke(ChaincodeStub stub) {
        try {
            _logger.info("Invoke java chaincode");
            String func = stub.getFunction();
            List<String> params = stub.getParameters();
            if (func.equals("registerCar")) {
                return registerCar(stub, params);
            }
            if (func.equals("sellMyCar")) {
                return sellMyCar(stub, params);
            }
            if (func.equals("buyUserCar")) {
                return buyUserCar(stub, params);
            }
            if (func.equals("changeCarOwner")) {
                return changeCarOwner(stub, params);
            }
            if (func.equals("getMyCar")) {
                return getMyCar(stub, params);
            }
            if (func.equals("getAllRegisteredCar")) {
                return getAllRegisteredCar(stub, params);
            }
            if (func.equals("getAllOrderedCar")) {
                return getAllOrderedCar(stub, params);
            }
            return newErrorResponse("Invalid invoke function name.");
        } catch (Throwable e) {
            return newErrorResponse(e);
        }
    }

    private Response registerCar(ChaincodeStub stub, List<String> args) {
		//args [0]: make , [1]:model, [2]:color, [3]:owner

		String key = args.get(3);
		String carState = stub.getStringState(key);
		if(!carState.isEmpty()){
			return newErrorResponse("owner already have car");
		}
		
		Car car = new Car(args.get(0), args.get(1), args.get(2), args.get(3),"none");
		carState = genson.serialize(car);
		stub.putStringState(key, carState);
        return newSuccessResponse("registerCar finished successfully");
    }

    private Response sellMyCar(ChaincodeStub stub, List<String> args) {
		//args [0] : owner
		String key = args.get(0);
		String carState = stub.getStringState(key);

		if(carState.isEmpty()){
			return newErrorResponse("owner doesn't have car");
		}
		stub.delState(key); //car user's car delete
		Car car = genson.deserialize(carState, Car.class);
		Car newCar = new Car(car.getMake(), car.getModel(), car.getColor(), car.getOwner(), "sale");
		carState = genson.serialize(newCar);
		stub.putStringState(key, carState);
        return newSuccessResponse("sellMyCar finished successfully");
    }

    private Response buyUserCar(ChaincodeStub stub, List<String> args) {
		//args [0] : cur_user, [1] : car_owner
		
		//1. if cur_user already have car, error
		String key = args.get(0);
		String carState = stub.getStringState(key);
		if(!carState.isEmpty())
			return newErrorResponse("cur_user already have car!, can't buy car");
			
        return changeCarOwner(stub, args);
    }

    private Response changeCarOwner(ChaincodeStub stub, List<String> args) {
		//args [0] : cur_user, [1] : car_owner
		//2. buy car
		String key = args.get(1);
		String carState = stub.getStringState(key);
		stub.delState(key); //car user's car delete
		Car car = genson.deserialize(carState, Car.class);
		Car newCar = new Car(car.getMake(), car.getModel(), car.getColor(), args.get(0), "done");
		carState = genson.serialize(newCar);
		key = args.get(0);
		stub.putStringState(key, carState);	
        return newSuccessResponse("invoke finished successfully");
    }

    private Response getMyCar(ChaincodeStub stub, List<String> args) {
		//args [0] : cur_user
		String key = args.get(0);
		String val = stub.getStringState(key);
		
		if(val.isEmpty()){
			Car car = new Car("","","","","");
			val = genson.serialize(car);
		}
		return newSuccessResponse(val, ByteString.copyFrom(val, UTF_8).toByteArray());
			
        //return newSuccessResponse(val, ByteString.copyFrom(val, UTF_8).toByteArray());  -> bytestring으로 val 값 return()
    }


    private Response getAllRegisteredCar(ChaincodeStub stub, List<String> args) {
		final String startKey = "user1";
		final String endKey = "user999";
		List<Car> cars = new ArrayList<Car>();

		QueryResultsIterator<KeyValue> results = stub.getStateByRange(startKey, endKey);

	
		for(KeyValue result : results){
			Car car = genson.deserialize(result.getStringValue(), Car.class);
			cars.add(car);
		}
		
		Car[] carArr = cars.toArray(new Car[cars.size()]);
		String val = genson.serialize(carArr);
		return newSuccessResponse(val, ByteString.copyFrom(val, UTF_8).toByteArray());

        //return newSuccessResponse(val, ByteString.copyFrom(val, UTF_8).toByteArray());  -> bytestring으로 val 값 return()
    }

    private Response getAllOrderedCar(ChaincodeStub stub, List<String> args) {
		final String startKey = "user1";
		final String endKey = "user999";
		List<Car> cars = new ArrayList<Car>();

		QueryResultsIterator<KeyValue> results = stub.getStateByRange(startKey, endKey);

		for(KeyValue result : results){
			Car car = genson.deserialize(result.getStringValue(), Car.class);
			if(car.getSale().equals("sale"))
				cars.add(car);
		}
		Car[] carArr = cars.toArray(new Car[cars.size()]);

		String val = genson.serialize(carArr);
		return newSuccessResponse(val, ByteString.copyFrom(val, UTF_8).toByteArray());

        //return newSuccessResponse(val, ByteString.copyFrom(val, UTF_8).toByteArray());  -> bytestring으로 val 값 return()
    }
	


    public static void main(String[] args) {
        System.out.println("OpenSSL avaliable: " + OpenSsl.isAvailable());
        new CarTrade().start(args);
    }
}
