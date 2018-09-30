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
            units: []
        }
    }

    render() {
        return (
            <div className={'page'} id={'main'}>
                <Link className={'hoverable'} to={'/'}>Back</Link>

                <div className={'logo'}>
                    Vectorly Multiplexer
                </div>

                <div className={'divider'}/>

                <div className={'unitContainer'}>
                    {
                        this.state.units
                    }
                </div>

                <div>
                    <button className={'hoverable'}
                            onClick={() => this.addUnit(1)}
                    >Add Full Unit
                    </button>
                    {
                        window.innerWidth > 600 &&
                        <button className={'hoverable'}
                                onClick={() => this.addUnit(2)}
                        >Add Half Unit
                        </button>
                    }
                </div>
            </div>
        )
    }

    addUnit = (size) => {
        this.setState(
            {
                units: [
                    ...this.state.units,
                    VisualizerUnit(
                        this.state.units.length,
                        (index) => {
                            const modified = this.state.units;
                            modified.splice(index, 1)
                            this.setState({units: modified})
                        },
                        size
                    )
                ]
            })
    }
}

const VisualizerUnit = (index, deleteHandler, size) => {
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
                    height={3 * window.innerHeight / 4}
                    width={(window.innerWidth - 32)/size}
                    advanced
                    editable
                />
            </div>
        </div>
    )
}