import {COLOURS} from "../Colours";

export class Vector {
    static LAST_ID = 0;

    id
    name;
    x;
    y;
    z;
    isVector;
    colour;

    constructor(x, y, z, isVector, temp, name, colour) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.isVector = isVector;
        this.colour = colour || COLOURS.blue;
        this.name = name;
        if (!temp) {
            this.id = Vector.LAST_ID + 1;
            Vector.LAST_ID += 1;
        }

    }

    setX(x) {
        this.x = x;
        return this;
    }

    setY(y) {
        this.y = y;
        return this;
    }

    setZ(z) {
        this.z = z;
        return this;
    }

    setColour(color) {
        this.colour = color;
        return this;
    }

    setName(name) {
        this.name = name;
        return this;
    }

    getMagnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }

    getEulers() {
        return {
            x: Math.acos(this.x / this.getMagnitude()),
            y: Math.acos(this.y / this.getMagnitude()),
            z: Math.acos(this.z / this.getMagnitude())
        }
    }

    getUnit() {
        return {
            x: this.x / this.getMagnitude(),
            y: this.y / this.getMagnitude(),
            z: this.z / this.getMagnitude()
        }
    }
}