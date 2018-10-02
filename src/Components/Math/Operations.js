export default class Operations {

    static secondary(f) {
        switch (f) {
            case Operations.add:
                return 'v2';
                break;
            case Operations.subtract:
                return 'v2';
                break;
            case Operations.cross:
                return 'v2';
                break;
            case Operations.dot:
                return 'v2';
                break;
            case Operations.project:
                return 'v2';
                break;
            case Operations.perpendicularProject:
                return 'v2';
                break;
            case Operations.scalarMultiply:
                return 'scalar';
                break;
            case Operations.unit:
                return undefined;
                break;
            case Operations.toHead:
                return 'v2';
                break;
            case Operations.toTail:
                return 'v2';
                break;
            default:
                return undefined;
        }
    }

    static fromIndex(index) {
        switch (parseFloat(index)) {
            case 0:
                return Operations.add;
                break;
            case 1:
                return Operations.subtract;
                break;
            case 2:
                return Operations.cross;
                break;
            case 3:
                return Operations.dot;
                break;
            case 4:
                return Operations.project;
                break;
            case 5:
                return Operations.perpendicularProject;
                break;
            case 6:
                return Operations.scalarMultiply;
            case 7:
                return Operations.unit;
                break
            case 8:
                return Operations.toHead;
                break
            case 9:
                return Operations.toTail;
                break
        }
    }

    static fromFunction(f) {
        switch (f) {
            case Operations.add:
                return 0;
                break;
            case Operations.subtract:
                return 1;
                break;
            case Operations.cross:
                return 2;
                break;
            case Operations.dot:
                return 3;
                break;
            case Operations.project:
                return 4;
                break;
            case Operations.perpendicularProject:
                return 5;
                break;
            case Operations.scalarMultiply:
                return 6
                break;
            case Operations.unit:
                return 7
                break;
            case Operations.toHead:
                return 8
                break;
            case Operations.toTail:
                return 9
                break
            default:
                return 0;
        }
    }

    static add(v1, v2) {

        var result = {
            isVector: true,
            x: parseFloat(v1.x) + parseFloat(v2.x),
            y: parseFloat(v1.y) + parseFloat(v2.y),
            z: parseFloat(v1.z) + parseFloat(v2.z),
            fromx: parseFloat(v1.fromx) + parseFloat(v1.x),
            fromy: parseFloat(v1.fromy) + parseFloat(v1.y),
            fromz: parseFloat(v1.fromz) + parseFloat(v1.z)
        }
        return result;
    }

    static subtract(v1, v2) {
        var result = {
            isVector: true,
            x: parseFloat(v1.x) - parseFloat(v2.x),
            y: parseFloat(v1.y) - parseFloat(v2.y),
            z: parseFloat(v1.z) - parseFloat(v2.z),
            fromx: parseFloat(v1.fromx) + parseFloat(v1.x),
            fromy: parseFloat(v1.fromy) + parseFloat(v1.y),
            fromz: parseFloat(v1.fromz) + parseFloat(v1.z)
        }
        return result;
    }

    static cross(v1, v2) {
        var result = {
            isVector: true,
            x: parseFloat(v1.y) * parseFloat(v2.z) - parseFloat(v1.z) * parseFloat(v2.y),
            y: parseFloat(v1.z) * parseFloat(v2.x) - parseFloat(v1.x) * parseFloat(v2.z),
            z: parseFloat(v1.x) * parseFloat(v2.y) - parseFloat(v1.y) * parseFloat(v2.x),
            fromx: parseFloat(v1.fromx),
            fromy: parseFloat(v1.fromy),
            fromz: parseFloat(v1.fromz)
        }
        return result;
    }

    static dot(v1, v2) {
        return {
            isVector: false,
            x: v1.x * v2.x + v1.y * v2.y + v1.z * v2.z
        }
    }

    static project(v1, v2) {
        let coeff = Operations.dot(v1, v2).x / v2.getMagnitude();


        return {
            isVector: true,
            x: v2.x / v2.getMagnitude() * coeff,
            y: v2.y / v2.getMagnitude() * coeff,
            z: v2.z / v2.getMagnitude() * coeff,
            fromx: parseFloat(v1.fromx),
            fromy: parseFloat(v1.fromy),
            fromz: parseFloat(v1.fromz)
        }

    }

    static perpendicularProject(v1, v2) {
        let proj = Operations.project(v1, v2);
        return Operations.subtract(v1, proj);
    }

    static scalarMultiply(v1, scalar) {
        var result = {
            isVector: true,
            x: parseFloat(v1.x) * parseFloat(scalar),
            y: parseFloat(v1.y) * parseFloat(scalar),
            z: parseFloat(v1.z) * parseFloat(scalar),
            fromx: parseFloat(v1.fromx),
            fromy: parseFloat(v1.fromy),
            fromz: parseFloat(v1.fromz)
        }
        return result;
    }

    static unit(v1) {
        return Operations.scalarMultiply(v1, 1 / v1.getMagnitude());
    }

    static toHead(v1, v2) {
        let v1Total = {
            ...v1,
            x: parseFloat(v1.x) + parseFloat(v1.fromx),
            y: parseFloat(v1.y) + parseFloat(v1.fromy),
            z: parseFloat(v1.z) + parseFloat(v1.fromz)
        }
        let v2Total = {
            ...v2,
            x: parseFloat(v2.x) + parseFloat(v2.fromx),
            y: parseFloat(v2.y) + parseFloat(v2.fromy),
            z: parseFloat(v2.z) + parseFloat(v2.fromz)
        }

        let result = Operations.subtract(v2Total, v1Total);
        return {
            ...result,
            fromx: v1Total.x,
            fromy: v1Total.y,
            fromz: v1Total.z

        }
    }

    static toTail(v1, v2) {
        let v1Total = {
            ...v1,
            x: parseFloat(v1.x) + parseFloat(v1.fromx),
            y: parseFloat(v1.y) + parseFloat(v1.fromy),
            z: parseFloat(v1.z) + parseFloat(v1.fromz)
        }
        let v2Tail = {
            ...v2,
            x: parseFloat(v2.fromx),
            y: parseFloat(v2.fromy),
            z: parseFloat(v2.fromz)
        }

        let result = Operations.subtract(v2Tail, v1Total);
        return {
            ...result,
            fromx: v1Total.x,
            fromy: v1Total.y,
            fromz: v1Total.z

        }
    }
}