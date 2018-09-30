import {Vector} from "./Vector";

export class Calculation {
    static LAST_ID = 0;

    static USED_VECTORS = [];

    id;
    operation;
    v1;
    v2;
    name;

    constructor(v1ID, v2ID, operation, name) {
        this.id = Calculation.LAST_ID + 1;

        this.operation = operation;
        this.v1 = v1ID;
        this.v2 = v2ID;
        this.name = name;

        Calculation.LAST_ID += 1;

        Calculation.USED_VECTORS.push(v1ID, v2ID);
    }

    calculate(vectors) {
        let result = this.operation(vectors.get(parseFloat(this.v1)), vectors.get(parseFloat(this.v2)));
        console.dir('calc');
        console.dir(this);
        return new Vector(result.x, result.y, result.z, result.isVector, true, this.name);
    }

    updateName(name) {
        this.name = name;
        return this;
    }

    updateOperation(operation) {
        this.operation = operation;
        return this
    }

    updateV1(v1) {
        Calculation.removeVector(this.v1)
        this.v1 = parseInt(v1);
        Calculation.USED_VECTORS.push(this.v1);
        return this
    }

    updateV2(v2) {
        Calculation.removeVector(this.v1);
        this.v2 = parseInt(v2);
        Calculation.USED_VECTORS.push(this.v2);
        return this
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