/*
 * SPDX-License-Identifier: Apache-2.0
 */

package org.hyperledger.fabric.example;

import java.util.Objects;

import org.hyperledger.fabric.contract.annotation.DataType;
import org.hyperledger.fabric.contract.annotation.Property;

import com.owlike.genson.annotation.JsonProperty;

@DataType()
public final class Car {

    @Property()
    private final String make;

    @Property()
    private final String model;

    @Property()
    private final String color;

    @Property()
    private final String owner;
	
 	@Property()
	private final String sale;

    public String getMake() {
        return make;
    }

    public String getModel() {
        return model;
    }

    public String getColor() {
        return color;
    }

    public String getOwner() {
        return owner;
    }

	public String getSale(){
		return sale;
	}


    public Car(final String make, final String model, final String color, final String owner,final String sale) {
        this.make = make;
        this.model = model;
        this.color = color;
        this.owner = owner;
		this.sale = sale;
    }
    @Override
    public boolean equals(final Object obj) {
        if (this == obj) {
            return true;
        }

        if ((obj == null) || (getClass() != obj.getClass())) {
            return false;
        }

        Car other = (Car) obj;

        return Objects.deepEquals(new String[] {getMake(), getModel(), getColor(), getOwner(),getSale()},
                new String[] {other.getMake(), other.getModel(), other.getColor(), other.getOwner(), other.getSale()});
    }

    @Override
    public int hashCode() {
        return Objects.hash(getMake(), getModel(), getColor(), getOwner());
    }

    @Override
    public String toString() {
        return this.getClass().getSimpleName() + "@" + Integer.toHexString(hashCode()) + " [make=" + make + ", model="
                + model + ", color=" + color + ", owner=" + owner + ", sale=" + sale + "]";
    }
}
