import React, {Component} from 'react'
import {Vector} from "../Math/Vector";
import {COLOURS} from "../Colours";
import Visualizer from "../UIElements/Visualizer/Visualizer";

import {Link} from 'react-router-dom'

import './Multiplex.css'


export default class Multiplex extends Component {

    constructor() {
        super();
        this.state = {
            units: new Map()
        }
    }

    render() {
        return (
            <div className={'page'} id={'main'}>
                <Link className={'hoverable'} to={'/app'}>Back</Link>

                <div className={'logo'}>
                    Vectorly Multiplexer
                </div>

                <div className={'divider'}/>

                <div className={'unitContainer'}>
                    {
                        [...this.state.units].map((val) => val[1])
                    }
                </div>

                <div>
                    <button className={'hoverable'}
                            onClick={() => this.addUnit(1, 1)}
                    >Add Unit
                    </button>
                    {
                        window.innerWidth > 600 &&
                        [
                            <button className={'hoverable'}
                                    onClick={() => this.addUnit(2, 1)}
                            >Add 1/2 Unit
                            </button>
                        ]
                    }
                </div>
            </div>
        )
    }

    addUnit = (sizeX, sizeY) => {
        const modifiedUnits = this.state.units;
        modifiedUnits.set(this.state.units.size,
            VisualizerUnit(
                this.state.units.size,
                (index) => {
                    const modified = this.state.units;
                    modified.delete(index)
                    this.setState({units: modified})
                },
                sizeX,
                sizeY
            ))
        this.setState(
            {
                units: modifiedUnits
            })
    }
}

const VisualizerUnit = (index, deleteHandler, sizeX, sizeY) => {
    const v1 = new Vector(10, 0, 0, true, false, 'X', COLOURS.blue);
    const v2 = new Vector(0, 10, 0, true, false, 'Y', COLOURS.red);
    const v3 = new Vector(0, 0, 10, true, false, 'Z', COLOURS.green);

    return (
        <div>
            <input className={'hidden'} placeholder={'Unit Name'}/>
            <br/>
            <button className={'hoverable accent'} onClick={() => deleteHandler(index)}>Delete</button>
            <div className={'card'}>
                <Visualizer
                    vectors={[v1, v2, v3]}
                    height={(3 * window.innerHeight / 4) / sizeY}
                    width={(window.innerWidth) / sizeX - 32}
                    advanced
                    editable
                />
            </div>
        </div>
    )
}