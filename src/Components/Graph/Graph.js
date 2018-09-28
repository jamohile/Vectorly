import React, {Component} from 'react'
import ReactTHREE from 'react-three';
import * as THREE from 'three';
import './Graph.css';
import {COLOURS} from "../../App";

var OrbitControls = require('three-orbit-controls')(THREE)
var MeshLine = require('three.meshline')

class Graph extends Component {
    camera;
    aspectratio;
    cameraprops = {};

    width;
    height;

    constructor(props) {
        super(props);
        this.cameraprops = {
            fov: 75,
            near: 1, far: 5000,
            position: new THREE.Vector3(20, 20, 20),
            lookat: new THREE.Vector3(0, 0, 0)
        }
        this.configure();
    }

    componentDidMount() {
        const controls = new OrbitControls(this.camera, document.querySelector('canvas'))
        controls.addEventListener('change', this.cameraChanged);
        window.addEventListener('resize', this.configure)
    }

    componentWillUpdate() {
        this.configure();
    }

    configure() {
        let container = document.getElementById('root');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspectratio = this.width / this.height;
        this.cameraprops = {
            ...this.cameraprops, ...{
                aspect: this.aspectratio
            }
        };
    }

    render() {
        if (this.camera) {
            this.cameraprops.position = this.camera.position;
        }
        let MAX_SIZE = 100;
        [...this.props.vectors].forEach(([id,v]) => {
            let m = v.getMagnitude();
           if(m > MAX_SIZE){
               MAX_SIZE = m;
           }
        });
        [...this.props.calculations].forEach(([id,c]) => {
            let m = c.calculate(this.props.vectors).getMagnitude();
            if(m > MAX_SIZE){
                MAX_SIZE = m;
            }
        });
        console.dir(MAX_SIZE);
        return (
            <ReactTHREE.Renderer
                width={this.width}
                height={this.height}
                background={'#ffffff'}
                sortObjects={false}
            >
                <ReactTHREE.Scene
                    width={this.width} height={this.height} camera="maincamera">
                    <ReactTHREE.PerspectiveCamera name="maincamera" ref={(e) => {
                        this.camera = e
                    }} {...this.cameraprops} />
                    {
                        /*
                        Render coordinate planes.
                         */
                    }
                    {
                        this.generateCartesians((MAX_SIZE * 1.1).toFixed(0))
                    }
                    {
                        /*
                        Render each vector.
                         */

                        [...this.props.vectors].map(([id, vector]) => {
                            return this.renderVector(vector, true, true, this.props.focused.has('v_'+ vector.id))
                        })}
                    {
                        [...this.props.calculations]
                            .map(([id, operation]) => {
                                return [id, operation.calculate(this.props.vectors)]
                            })
                            .filter(([id,result]) => {
                                return [id,result.isVector]
                            })
                            .map(([id,result]) => this.renderVector(result, false, true, this.props.focused.has('c_' + id)))
                    }
                </ReactTHREE.Scene>
            </ReactTHREE.Renderer>
        )
    }

    renderVector = (vector, solid = true, showBounds, focus) => {
        console.dir(focus);
        var scale = focus ? .4 : .2

        var v = new THREE.Vector3(vector.x, vector.y, vector.z)
        var boxGeometry = new THREE.BoxGeometry(scale, scale, v.length());

        var material = solid ?
            new THREE.MeshBasicMaterial({color: vector.colour.num})
            :
            new THREE.MeshBasicMaterial({color: COLOURS.orange.num})

        boxGeometry.lookAt(v);

        var vector = [
            <ReactTHREE.Mesh
                position={v.divideScalar(2)}
                geometry={boxGeometry}
                material={material}
            />
        ];
        if (showBounds) {
            vector.push(
                <ReactTHREE.Mesh
                    position={v}
                    geometry={new THREE.BoxGeometry(2 * v.x, 2 * v.y, 2 * v.z)}
                    material={new THREE.MeshBasicMaterial({
                        wireframe: true,
                        color: 0xcfcfcf,
                        transparent: true,
                        opacity: 0.4
                    })}
                />
            );
        }
        return (vector);

    }
    cameraChanged = () => {

    }
    generateCartesians = (size) => {
        let origin = new THREE.Vector3(0, 0, 0);

        let XBound = new THREE.Vector3(size, 0, 0);
        let YBound = new THREE.Vector3(0, size, 0);
        let ZBound = new THREE.Vector3(0, 0, size);

        var xGeo = new THREE.Geometry().setFromPoints([origin, XBound]);
        var yGeo = new THREE.Geometry().setFromPoints([origin, YBound]);
        var zGeo = new THREE.Geometry().setFromPoints([origin, ZBound]);

        var negXGeo = new THREE.Geometry().setFromPoints([origin, XBound.multiplyScalar(-1)]);
        var negYGeo = new THREE.Geometry().setFromPoints([origin, YBound.multiplyScalar(-1)]);
        var negZGeo = new THREE.Geometry().setFromPoints([origin, ZBound.multiplyScalar(-1)]);


        var material = new THREE.LineBasicMaterial({color: 0});
        var negativeMaterial = new THREE.LineDashedMaterial({
            color: 0xcccccc,
            linewidth: 1,
            scale: 1,
            dashSize: 3,
            gapSize: 10,
        });

        return (
            [
                ...[
                    <ReactTHREE.Line
                        geometry={xGeo}
                        material={material}
                    />,
                    <ReactTHREE.Line
                        geometry={yGeo}
                        material={material}
                    />,
                    <ReactTHREE.Line
                        geometry={zGeo}
                        material={material}
                    />,

                    <ReactTHREE.Line
                        geometry={negXGeo}
                        material={negativeMaterial}
                    />,
                    <ReactTHREE.Line
                        geometry={negYGeo}
                        material={negativeMaterial}
                    />,
                    <ReactTHREE.Line
                        geometry={negZGeo}
                        material={negativeMaterial}
                    />
                ],
                //Along Z axis
                this.generateMinorGridLines(size, size/5, (bound, val) => {
                    return new THREE.Vector3(bound, 0, val)
                }),
                this.generateMinorGridLines(size, size/5, (bound, val) => {
                    return new THREE.Vector3(0, bound, val)
                }),
                //Along X axis
                this.generateMinorGridLines(size, size/5, (bound, val) => {
                    return new THREE.Vector3(val, 0, bound)
                }),
                this.generateMinorGridLines(size, size/5, (bound, val) => {
                    return new THREE.Vector3(val, bound, 0)
                }),
                //Along Y axis
                this.generateMinorGridLines(size, size/5, (bound, val) => {
                    return new THREE.Vector3(0, val, bound)
                }),
                this.generateMinorGridLines(size, size/5, (bound, val) => {
                    return new THREE.Vector3(bound, val, 0)
                })
            ]
        )
    }

    generateMinorGridLines(bound, num, modifier) {
        var negativeMaterial = new THREE.LineDashedMaterial({
            color: 0,
            linewidth: 1,
            scale: 1,
            dashSize: 3,
            gapSize: 10,
            transparent: true, opacity: 0.05
        });
        const cleanNum = num.toFixed(0);
        return (
            [...Array(2 * cleanNum + 1).keys()].map((n, i) => {
                return (
                    <ReactTHREE.Line
                        geometry={
                            new THREE.Geometry().setFromPoints([modifier(-bound, bound - (bound / cleanNum) * n), modifier(bound, bound - (bound / cleanNum) * n)])
                        }
                        material={negativeMaterial}
                    />
                )
            })
        )
    }
}

export default Graph;