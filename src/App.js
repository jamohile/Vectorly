import React, {Component} from 'react';
import './App.css';

import {BrowserRouter, Route, Link, NavLink} from 'react-router-dom';

import Main from "./Components/Pages/Main/Main";
import Learn from "./Components/Pages/Learn";
import Multiplex from "./Components/Pages/Multiplex";


class App extends Component {

    constructor(){
        super();
        this.resize = this.resize.bind(this);
        window.addEventListener('resize', this.resize);
    }

    resize = () => {
        this.forceUpdate();
    }

    render() {
        return (
            <BrowserRouter>
                <div className={'App'}>
                    <Route exact path={'/'} component={Main}/>
                    <Route exact path={'/app'} component={Main}/>
            
                    <Route path={'/learn'} component={Learn}/>
                    <Route path={'/app/learn'} component={Learn}/>
            
                    <Route path={'/multiplexer'} component={Multiplex}/>
                    <Route path={'/app/multiplexer'} component={Multiplex}/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
