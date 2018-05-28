import React, {Component} from 'react';
import './Sidebar.css'
import {COLOURS, Operations} from "../App";

class Sidebar extends Component {
    state = {
        closed: false,
        display: 'VECTORS'
    }


    render() {
        return (
            <div
                id={'sidebar'}
                className={this.state.closed ? 'closed' : ''}
            >
                <div
                    id={'toggle'}
                    className={'hoverable'}
                    onClick={() => {
                        this.toggle()
                    }}>
                    >
                </div>
                <div id={'logo'}>Vectorly</div>
                <div className={'buttons toggle'}>
                    <button className={'hoverable'}
                        onClick={() => {
                            this.setState({display: 'VECTORS'})
                        }}
                    >
                        Vectors
                    </button>
                    <button className={'hoverable accent'}
                            onClick={() => {
                                this.setState({display: 'CALCULATIONS'})
                            }}
                    >
                        Calculations
                    </button>
                </div>
                {

                    this.state.display == 'VECTORS' &&
                    <div id={'items'}>
                        {
                            [...this.props.vectors].map(([id, vector]) => {
                                return (
                                    <Item
                                        item={vector}
                                        deleteItem={this.props.deleteItem}
                                        updateItem={this.props.updateItem}
                                    />
                                )
                            })
                        }
                    </div>
                }
                {

                    this.state.display == 'CALCULATIONS' &&
                    <div id={'items'}>
                        {
                            [...this.props.calculations].map(([id, operation]) => {
                                return (
                                    <OperationItem
                                        item={operation}
                                        vectors={this.props.vectors}
                                        deleteCalculation={this.props.deleteCalculation}
                                        updateCalculationOperation={this.props.updateCalculationOperation}
                                        updateCalculationV1={this.props.updateCalculationV1}
                                        updateCalculationV2={this.props.updateCalculationV2}
                                    />
                                )
                            })
                        }
                    </div>
                }
                <div className={'buttons'}>
                    Add New<br/>
                    <button className={'hoverable'} onClick={this.props.addVector}>Vector</button>
                    <button className={'hoverable accent'} onClick={this.props.addCalculation}>Calculation</button>
                </div>
            </div>
        );
    }

    toggle() {
        this.setState({closed: !this.state.closed});
    }
}

class Item extends Component {
    render() {

        let colours = Object.keys(COLOURS).map((k) => COLOURS[k]);
        return (
            <div className={'item'}>
                <div className={'controls'}>
                    <select className={'hidden colour'}
                           value={this.props.item.name}
                            style={{background: this.props.item.colour.str}}
                           onChange={(e) => {
                               this.props.updateItem(this.props.item, {...this.props.item, colour: colours[parseInt(e.target.value)]})
                           }}
                    >
                        {
                            colours.map((colour, index) => {
                                return(
                                    <option value={index} style={{background: colour.str}}>

                                    </option>
                                )
                            })
                        }
                    </select>
                    <input className={'hidden'}
                           value={this.props.item.name}
                           onChange={(e) => {
                               this.props.updateItem(this.props.item, {...this.props.item, name: e.target.value})
                           }}
                    />
                    <span>
                        <span
                            className={'material-icons hoverable'}
                            onClick={() => {
                                this.props.deleteItem(this.props.item)
                            }}
                            style={{
                                color: 'var(--negative)'
                            }}
                        >delete</span>
                    </span>
                </div>
                <div className={'properties'}>
                    <input className="property component"
                           placeholder={'X'}
                           value={this.props.item.x}
                           onChange={(e) => {
                               this.props.updateItem(this.props.item, {...this.props.item, x: e.target.value})
                           }}
                    />
                    <input className="property component"
                           placeholder={'Y'} value={this.props.item.y}
                           onChange={(e) => {
                               this.props.updateItem(this.props.item, {...this.props.item, y: e.target.value})
                           }}/>
                    <input className="property component"
                           placeholder={'Z'} value={this.props.item.z}
                           onChange={(e) => {
                               this.props.updateItem(this.props.item, {...this.props.item, z: e.target.value})
                           }}/>
                </div>
            </div>
        )
    }
}

class OperationItem extends Component {

    getVectorOptions() {
        return (
            [...this.props.vectors].map(([id, vector]) => {
                return (
                    <option value={id}>
                        {vector.name}
                    </option>
                )
            })
        );
    }

    render() {
        let vector = this.props.item.calculate(this.props.vectors);
        return (
            <div className={'item'}>
                <div className={'controls'}>
                    <input className={'hidden'} value={'Sum'}/>
                    <span>
                        <span
                            className={'material-icons hoverable'}
                            onClick={() => {
                                this.props.deleteCalculation(this.props.item)
                            }}
                            style={{
                                color: 'var(--negative)'
                            }}
                        >delete</span>
                    </span>
                </div>
                <div className={'properties'}>
                    <select className="property calculation"
                            placeholder={'V1'}
                            value={this.props.item.v1}
                            onChange={(e) => {
                                this.props.updateCalculationV1(this.props.item,  e.target.value)
                            }}
                    >
                        {
                            this.getVectorOptions()
                        }
                    </select>
                    <select
                        type='select'
                        className="property calculation"
                        placeholder={'Operation'}
                        value={Operations.fromFunction(this.props.item.operation)}
                        onChange={(e) => {
                            console.dir(e);
                            this.props.updateCalculationOperation(this.props.item, Operations.fromIndex(e.target.value))
                        }}>
                        <option value={0}>Plus</option>
                        <option value={1}>Minus</option>
                        <option value={2}>Cross</option>
                    </select>
                    <select className="property calculation"
                            placeholder={'V2'}
                            value={this.props.item.v2}
                            onChange={(e) => {
                                this.props.updateCalculationV2(this.props.item,  e.target.value)
                            }}
                    >
                        {
                            this.getVectorOptions()
                        }
                    </select>
                </div>
                <div className={'properties'}>
                    <input className={'property component'} disabled={true} value={`X: ${vector.x}`}/>
                    <input className={'property component'} disabled={true} value={`Y: ${vector.y}`}/>
                    <input className={'property component'} disabled={true} value={`Z: ${vector.z}`}/>
                </div>
                <div className={'properties'}>
                    <input className={'property component'} disabled={true} value={`α: ${vector.getEulers().x}`}/>
                    <input className={'property component'} disabled={true} value={`β: ${vector.getEulers().y}`}/>
                    <input className={'property component'} disabled={true} value={`γ: ${vector.getEulers().z}`}/>
                </div>
                <div className={'properties'}>
                    <input className={'property'} disabled={true} value={`Magnitude: ${vector.getMagnitude()}`} style={{width: '100%'}}/>
                </div>


            </div>
        )
    }
}

export default Sidebar