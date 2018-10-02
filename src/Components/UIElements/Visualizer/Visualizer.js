import React, {Component} from 'react'
import './Visualizer.css'
import {Vector} from "../../Math/Vector";
import {COLOURS} from "../../Colours";
import Graph from "../../Graph/Graph";
import Sidebar from "../Sidebar/Sidebar";
import {Calculation} from "../../Math/Calculation";
import Operations from "../../Math/Operations";

export default class Visualizer extends Component{
    constructor() {
        super();
        this.state = {}
    }

    componentWillMount() {
        var vectorsMap = new Map();
        (this.props.vectors || []).forEach(v => vectorsMap.set(v.id, v));

        var calculationsMap = new Map();
        (this.props.calculations || []).forEach(c => calculationsMap.set(c.id, c))

        this.setState({
            vectors: vectorsMap,
            calculations: calculationsMap,
            focused: new Map()
        });
    }

    render() {

        return (
            <div className="visualizer" style={{width: this.props.width, height: this.props.height}}>
                <Graph
                    width={this.props.width}
                    height={this.props.height}
                    vectors={this.state.vectors}
                    calculations={this.state.calculations}
                    focused={this.state.focused}
                />
                {this.props.editable &&
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
                        advanced={this.props.advanced}
                    />
                }
            </div>
        );
    }


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
        console.dir(item);
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
