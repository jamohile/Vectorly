export class Operations {

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
                return Operations.perpendicularProject
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
            fromx: parseFloat(v1.fromx),
            fromy: parseFloat(v1.fromy),
            fromz: parseFloat(v1.fromz)
        }
        return result;
    }

    static subtract(v1, v2) {
        var result = {
            isVector: true,
            x: parseFloat(v1.x) - parseFloat(v2.x),
            y: parseFloat(v1.y) - parseFloat(v2.y),
            z: parseFloat(v1.z) - parseFloat(v2.z),
            fromx: parseFloat(v1.x),
            fromy: parseFloat(v1.y),
            fromz: parseFloat(v1.z)
        }
        return result;
    }

    static cross(v1, v2) {
        var result = {
            isVector: true,
            x: parseFloat(v1.y) * parseFloat(v2.z) - parseFloat(v1.z) * parseFloat(v2.y),
            y: parseFloat(v1.z) * parseFloat(v2.x) - parseFloat(v1.x) * parseFloat(v2.z),
            z: parseFloat(v1.x) * parseFloat(v2.y) - parseFloat(v1.y) * parseFloat(v2.x),
            fromx: parseFloat(v1.x),
            fromy: parseFloat(v1.y),
            fromz: parseFloat(v1.z)
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
        let coeff = Operations.dot(v1, v2).x / v2.getMagnitude()
        console.dir(coeff);
        return {
            isVector: true,
            x: v2.x / v2.getMagnitude() * coeff,
            y: v2.y / v2.getMagnitude() * coeff,
            z: v2.z / v2.getMagnitude() * coeff,
            fromx: parseFloat(v1.x),
            fromy: parseFloat(v1.y),
            fromz: parseFloat(v1.z)
        }

    }

    static perpendicularProject(v1, v2) {
        let proj = Operations.project(v1, v2);
        return Operations.subtract(v1, proj);
    }
}