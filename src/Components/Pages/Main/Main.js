import React, {Component} from 'react'
import {Vector} from "../../Math/Vector";
import {COLOURS} from "../../Colours";
import Visualizer from "../../UIElements/Visualizer/Visualizer";

import {Link} from 'react-router-dom'

import './Main.css'

const initalVectors = [
    new Vector(10, 0, 0, true, false, 'X', COLOURS.blue),
    new Vector(0, 10, 0, true, false, 'Y', COLOURS.red),
    new Vector(0, 0, 10, true, false, 'Z', COLOURS.green)
]
export default class Main extends Component {

    constructor() {
        super();
        this.state = {
            advanced: false,
            controlsOpen: false
        }
    }

    render() {

        return (
            <div className={'page'} id={'main'}>
                <div className={'controls'}>
                    {
                        !this.state.controlsOpen &&
                        <span className={'material-icons hoverable'}
                              onClick={() => this.setState({controlsOpen: true})}>
                                menu
                        </span>
                    }
                    {
                        this.state.controlsOpen &&
                        <div className={'card padded opaque'}>
                            <span className={'material-icons hoverable'}
                                  onClick={() => this.setState({controlsOpen: false})}>
                                close
                            </span>
                            <br/>
                            <Link className={'hoverable'} to={'/app/learn'}>Learn</Link>
                            <br/>
                            <Link className={'hoverable'} to={'/app/multiplexer'}>Multiplexer</Link>
                            <div className={'divider minor'}/>

                            <button className={'hoverable accent'}
                                    onClick={() => this.setState({advanced: !this.state.advanced})}
                            >
                                {this.state.advanced ? 'Basic' : 'Advanced'}
                            </button>
                        </div>
                    }
                </div>
                <Visualizer
                    vectors={initalVectors}
                    height={window.innerHeight}
                    width={window.innerWidth}
                    advanced={this.state.advanced}
                    editable
                />
            </div>
        )
    }
}