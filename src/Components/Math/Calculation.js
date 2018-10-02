import {Vector} from "./Vector";
import {COLOURS} from "../Colours";
import Operations from "./Operations";

export class Calculation {
    static LAST_ID = 0;

    static USED_VECTORS = [];

    id;
    operation;
    v1;
    v2;
    scalar;
    name;

    constructor(v1ID, v2ID, operation, name, scalar) {
        this.id = Calculation.LAST_ID + 1;

        this.operation = operation;
        this.v1 = v1ID;
        this.v2 = v2ID;
        this.name = name;
        this.scalar = scalar;

        Calculation.LAST_ID += 1;

        Calculation.USED_VECTORS.push(v1ID, v2ID);
    }

    calculate(vectors) {
        let result;
        switch (Operations.secondary(this.operation)){
            case 'v2':
                result = this.operation(vectors.get(parseFloat(this.v1)), vectors.get(parseFloat(this.v2)));
                break;
            case 'scalar':
                result =this.operation(vectors.get(parseFloat(this.v1)), this.scalar);
                break;
            case undefined:
                result =this.operation(vectors.get(parseFloat(this.v1)));
        }

        console.dir(result);
        var vector = new Vector(result.x, result.y, result.z, result.isVector, true, this.name, COLOURS.orange, result.fromx, result.fromy, result.fromz);
        console.dir(vector);
        return vector
    }

    updateName(name) {
        this.name = name;
        return this;
    }

    updateOperation(operation) {
        this.operation = operation;

        if(Operations.secondary(operation) != 'v2'){
            Calculation.removeVector(this.v2);
        }
        return this
    }

    updateV1(v1) {
        Calculation.removeVector(this.v1)
        this.v1 = parseInt(v1);
        Calculation.USED_VECTORS.push(this.v1);
        return this
    }

    updateV2(v2) {
        Calculation.removeVector(this.v2);
        this.v2 = parseInt(v2);
        Calculation.USED_VECTORS.push(this.v2);
        return this
    }

    updateScalar(scalar){
        this.scalar = scalar;
        return this;
    }

    static usesVector(vID) {
        return Calculation.USED_VECTORS.includes(vID);
    }

    static removeVector(vID) {
        if (Calculation.USED_VECTORS.includes(vID)) {
            Calculation.USED_VECTORS.splice(Calculation.USED_VECTORS.indexOf(vID), 1);
        }
    }
}