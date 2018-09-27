import React, {Component} from 'react';
import './App.css';

import Sidebar from './Components/Sidebar';
import Graph from './Components/Graph/Graph';

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

class Calculation {
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
        this.v1 = v1;
        return this
    }

    updateV2(v2) {
        this.v2 = v2;
        return this
    }

    static usesVector(vID) {
        return Calculation.USED_VECTORS.includes(vID);
    }

    static removeVector(vID) {
        Calculation.USED_VECTORS.splice(Calculation.USED_VECTORS.indexOf(vID), 1);
    }
}

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
            z: parseFloat(v1.z) + parseFloat(v2.z)
        }
        return result;
    }

    static subtract(v1, v2) {
        var result = {
            isVector: true,
            x: parseFloat(v1.x) - parseFloat(v2.x),
            y: parseFloat(v1.y) - parseFloat(v2.y),
            z: parseFloat(v1.z) - parseFloat(v2.z)
        }
        return result;
    }

    static cross(v1, v2) {
        var result = {
            isVector: true,
            x: parseFloat(v1.y) * parseFloat(v2.z) - parseFloat(v1.z) * parseFloat(v2.y),
            y: parseFloat(v1.z) * parseFloat(v2.x) - parseFloat(v1.x) * parseFloat(v2.z),
            z: parseFloat(v1.x) * parseFloat(v2.y) - parseFloat(v1.y) * parseFloat(v2.x)
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
            z: v2.z / v2.getMagnitude() * coeff
        }

    }

    static perpendicularProject(v1, v2) {
        let proj = Operations.project(v1, v2);
        return Operations.subtract(v1, proj);
    }
}

export const COLOURS = {
    blue: {num: 0x00A6FF, str: '#00A6FF', name: 'Blue'},
    orange: {num: 0xFF9052, str: '#FF9052', name: 'Orange'},
    red: {num: 0xF95F62, str: '#F95F62', name: 'Red'},
    green: {num: 0x77D353, str: '#77D353', name: 'Green'},
    yellow: {num: 0xFFD185, str: '#FFD185', name: 'Yellow'},
    gold: {num: 0xFFBA5C, str: '#FFBA5C', name: 'Gold'},
    brown: {num: 0xB8977E, str: '#B8977E', name: 'Brown'},
    purple: {num: 0x976DD0, str: '#976DD0', name: 'Purple'}

}

class App extends Component {
    constructor() {
        super();
        var v1 = new Vector(10, 0, 0, true, false, 'X', COLOURS.blue);
        var v2 = new Vector(0, 10, 0, true, false, 'Y', COLOURS.red);
        var v3 = new Vector(0, 0, 10, true, false, 'Z', COLOURS.green);

        var vectors = new Map();
        var calculations = new Map();

        vectors.set(v1.id, v1);
        vectors.set(v2.id, v2);
        vectors.set(v3.id, v3);

        this.state = {
            vectors: vectors,
            calculations: calculations,
            focused: new Map()
        }

    }

    componentDidMount() {
        window.addEventListener('resize', this.resize);
    }

    render() {
        return (
            <div className="App">
                <Graph
                    width={window.innerWidth}
                    height={window.innerHeight}
                    vectors={this.state.vectors}
                    calculations={this.state.calculations}
                    focused={this.state.focused}
                />
                <Sidebar
                    vectors={this.state.vectors}
                    calculations={this.state.calculations}
                    addVector={(v) => {
                        this.addVector(v)
                    }}
                    addCalculation={() => {
                        this.addCalculation()
                    }}
                    deleteItem={(item) => {
                        this.deleteItem(item)
                    }}
                    deleteCalculation={(item) => {
                        this.deleteCalculation(item)
                    }}
                    updateCalculation={(item, updated) => {
                        this.updateCalculation(item, updated);
                    }}
                    updateItem={(item, updated) => {
                        this.updateItem(item, updated)
                    }}
                    updateCalculationOperation={(item, operation) => {
                        this.updateCalculationOperation(item, operation)
                    }}
                    updateCalculationV1={(item, v1ID) => {
                        this.updateCalculationV1(item, v1ID)
                    }}
                    updateCalculationV2={(item, v2ID) => {
                        this.updateCalculationV2(item, v2ID)
                    }}
                    toggleFocused={(id) => {
                        this.toggleFocused(id)
                    }}
                    focused={this.state.focused}
                />
            </div>
        );
    }

    resize = () => this.forceUpdate();

    addVector(v) {
        let vectors = this.state.vectors;
        var vector = v || new Vector(10, 10, 10, true, false, 'Vector', COLOURS.blue);
        vectors.set(vector.id, vector);

        this.setState({
            vectors: vectors
        })
    }

    addCalculation() {
        let calculations = this.state.calculations;
        let vectors = [...this.state.vectors];

        if (vectors.length > 0) {
            let v1 = vectors[0][0];
            let v2;
            if (vectors.length > 1) {
                v2 = vectors[1][0];
            } else {
                v2 = vectors[0][0];
            }
            var calc = new Calculation(v1, v2, Operations.add, 'Calculation');
            calculations.set(calc.id, calc);

            this.setState({
                calculations: calculations
            })
        }
    }

    deleteItem(item) {
        if (!Calculation.usesVector(item.id)) {
            var modifiedVectors = this.state.vectors;
            modifiedVectors.delete(item.id);
            this.setState({
                vectors: modifiedVectors
            });
        } else {
            alert('This vector is being used in a calculation.')
        }
    }

    deleteCalculation(item) {
        var modifiedCalculations = this.state.calculations;
        modifiedCalculations.delete(item.id);
        Calculation.removeVector(item.v1);
        Calculation.removeVector(item.v2);
        this.setState({
            calculations: modifiedCalculations
        });
    }

    updateItem(item, updated) {
        var modifiedVectors = this.state.vectors;
        modifiedVectors.set(item.id, updated);
        this.setState({
            vectors: modifiedVectors
        });
    }

    updateCalculation(item, updated) {

        var modifiedCalcs = this.state.calculations;
        modifiedCalcs.set(item.id, updated);
        this.setState({
            calculations: modifiedCalcs
        });
    }

    updateCalculationOperation(item, operation) {
        var modifiedCalcs = this.state.calculations;
        var modifiedCalcs = this.state.calculations;
        modifiedCalcs.set(item.id, modifiedCalcs.get(item.id).updateOperation(operation));
        this.setState({
            calculations: modifiedCalcs
        });
    }

    updateCalculationV1(item, v1ID) {
        var modifiedCalcs = this.state.calculations;
        modifiedCalcs.set(item.id, modifiedCalcs.get(item.id).updateV1(v1ID));
        this.setState({
            calculations: modifiedCalcs
        });
    }

    updateCalculationV2(item, v2ID) {
        var modifiedCalcs = this.state.calculations;
        modifiedCalcs.set(item.id, modifiedCalcs.get(item.id).updateV2(v2ID));
        this.setState({
            calculations: modifiedCalcs
        });
    }

    setFocused(id) {
        let focused = this.state.focused;
        focused.set(id, true);
        this.setState({
            focused: focused
        });
    }

    removeFocused(id) {
        let focused = this.state.focused;
        focused.delete(id);
        this.setState({
            focused: focused
        });
    }

    toggleFocused(id) {
        if (this.state.focused.has(id)) {
            this.removeFocused(id)
        } else {
            this.setFocused(id);
        }
    }
}

export default App;
