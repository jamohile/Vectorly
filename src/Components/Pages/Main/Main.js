import React, {Component} from 'react'
import {Vector} from "../../Math/Vector";
import {COLOURS} from "../../Colours";
import Visualizer from "../../UIElements/Visualizer/Visualizer";

import {Link} from 'react-router-dom'

import './Main.css'

export default class Main extends Component {
    constructor(){
        super();
        this.state = {
            advanced: false
        }
    }

    render() {
        const v1 = new Vector(10, 0, 0, true, false, 'X', COLOURS.blue);
        const v2 = new Vector(0, 10, 0, true, false, 'Y', COLOURS.red);
        const v3 = new Vector(0, 0, 10, true, false, 'Z', COLOURS.green);

        return (
            <div className={'page'} id={'main'}>
                <div className={'controls'}>
                    <Link className={'hoverable'} to={'/learn'}>Learn</Link>
                    <br/>
                    <Link className={'hoverable'} to={'/multiplexer'}>Multiplexer</Link>
                    <br/>
                    <button className={'hoverable accent'}
                        onClick={() => this.setState({advanced: !this.state.advanced})}
                    >
                        {this.state.advanced ? 'Basic' : 'Advanced'}
                    </button>
                </div>
                <Visualizer
                    vectors={[v1, v2, v3]}
                    height={window.innerHeight}
                    width={window.innerWidth}
                    advanced={this.state.advanced}
                    editable
                />
            </div>
        )
    }
}