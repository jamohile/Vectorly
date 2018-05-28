import React, {Component} from 'react';
import './App.css';

import Sidebar from './Components/Sidebar';
import Graph from './Components/Graph/Graph';

class Vector {
    static LAST_ID = 0;

    id
    name;
    x;
    y;
    z;
    colour;

    constructor(x, y, z, temp, name, colour) {
        this.x = x;
        this.y = y;
        this.z = z;
        if (!temp) {
            this.id = Vector.LAST_ID + 1;
            this.colour = colour;
            this.name = name;
            Vector.LAST_ID += 1;
        }
    }

    getMagnitude() {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }
    getEulers(){
        return {
            x: Math.acos(this.x/this.getMagnitude()),
            y: Math.acos(this.y/this.getMagnitude()),
            z: Math.acos(this.z/this.getMagnitude())
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

    constructor(v1ID, v2ID, operation) {
        this.id = Calculation.LAST_ID + 1;

        this.operation = operation;
        this.v1 = v1ID;
        this.v2 = v2ID;

        Calculation.LAST_ID += 1;

        Calculation.USED_VECTORS.push(v1ID, v2ID);
    }

    calculate(vectors) {
        let result = this.operation(vectors.get(parseFloat(this.v1)), vectors.get(parseFloat(this.v2)));
        return new Vector(result.x, result.y, result.z, true);
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
            default:
                return 0;
        }
    }

    static add(v1, v2) {
        var result = {
            x: parseFloat(v1.x) + parseFloat(v2.x),
            y: parseFloat(v1.y) + parseFloat(v2.y),
            z: parseFloat(v1.z) + parseFloat(v2.z)
        }
        return result;
    }

    static subtract(v1, v2) {
        var result = {
            x: parseFloat(v1.x) - parseFloat(v2.x),
            y: parseFloat(v1.y) - parseFloat(v2.y),
            z: parseFloat(v1.z) - parseFloat(v2.z)
        }
        return result;
    }

    static cross(v1, v2) {
        var result = {
            x: parseFloat(v1.y) * parseFloat(v2.z) - parseFloat(v1.z) * parseFloat(v2.y),
            y: parseFloat(v1.z) * parseFloat(v2.x) - parseFloat(v1.x) * parseFloat(v2.z),
            z: parseFloat(v1.x) * parseFloat(v2.y) - parseFloat(v1.y) * parseFloat(v2.x)
        }
        return result;
    }
}

export const COLOURS = {
    blue: {num: 0x00A6FF, str: '#00A6FF'},
    orange: {num: 0xFF9052, str: '#FF9052'},
    red: {num: 0xF95F62, str: '#F95F62'},
    green: {num: 0x77D353, str: '#77D353'},
    yellow: {num: 0xFFD185, str: '#FFD185'},
    gold: {num: 0xFFBA5C, str: '#FFBA5C'},
    brown: {num: 0xB8977E, str: '#B8977E'},
    purple: {num: 0x976DD0, str: '#976DD0'}

}

class App extends Component {
    constructor() {
        super();
        var v1 = new Vector(10, 0, 0, false, 'Force', COLOURS.blue);
        var v2 = new Vector(0, 10, 0, false, 'Displacement', COLOURS.red);

        var vectors = new Map();
        var calculations = new Map();

        vectors.set(v1.id, v1);
        vectors.set(v2.id, v2);

        var calc = new Calculation(v1.id, v2.id, Operations.add);
        calculations.set(calc.id, calc);

        this.state = {
            vectors: vectors,
            calculations: calculations
        }

    }

    componentDidMount() {
        window.addEventListener('resize', this.resize);
    }

    render() {
        console.dir('render');
        return (
            <div className="App">
                <Graph
                    width={window.innerWidth}
                    height={window.innerHeight}
                    vectors={this.state.vectors}
                    calculations={this.state.calculations}
                />
                <Sidebar
                    vectors={this.state.vectors}
                    calculations={this.state.calculations}
                    addVector={() => {
                        this.addVector()
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
                />
            </div>
        );
    }

    resize = () => this.forceUpdate();

    addVector() {
        let vectors = this.state.vectors;
        var vector = new Vector(10, 10, 10, false, 'Vector', COLOURS.blue);
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
            var calc = new Calculation(v1, v2, Operations.add);
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
}

export default App;
