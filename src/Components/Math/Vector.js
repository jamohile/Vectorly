import {COLOURS} from "../Colours";

export class Vector {
    static LAST_ID = 0;

    id
    name;

    fromx;
    fromy;
    fromz;


    x;
    y;
    z;
    isVector;
    colour;

    constructor(x, y, z, isVector, temp, name, colour, fromx, fromy, fromz) {
        this.x = x;
        this.y = y;
        this.z = z;

        console.dir(fromx);
        this.fromx = fromx ? fromx : 0
        this.fromy = fromy || 0
        this.fromz = fromz || 0

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

    setOriginX(x){
        this.fromx = x;
        return this
    }

    setY(y) {
        this.y = y;
        return this;
    }
    setOriginY(y){
        this.fromy = y;
        return this
    }

    setZ(z) {
        this.z = z;
        return this;
    }
    setOriginZ(z){
        this.fromz = z;
        return this
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
    //Returns the magnitude including origin.
    getBoundedMagnitude(){
        return Math.sqrt((parseFloat(this.x) + parseFloat(this.fromx)) ** 2 + (parseFloat(this.y) + parseFloat(this.fromy)) ** 2 + (parseFloat(this.z) + parseFloat(this.fromz)) **2);
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