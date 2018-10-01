import React, {Component} from 'react'
import ReactTHREE from 'react-three';
import * as THREE from 'three';
import './Graph.css';
import {COLOURS} from "../Colours";
import {Operations} from "../Math/Operations";

var OrbitControls = require('three-orbit-controls')(THREE)
var MeshLine = require('three.meshline')

class Graph extends Component {

    constructor(props) {
        super(props);

        this.camera = undefined;
        this.aspectratio = undefined;
        this.cameraprops = {};

        this.width = undefined;
        this.height = undefined;

        this.cameraprops = {
            fov: 75,
            near: 1, far: 5000,
            position: new THREE.Vector3(20, 20, 20),
            lookat: new THREE.Vector3(0, 0, 0)
        }
    }

    componentWillMount(){
        this.configure()
    }
    componentDidMount() {
        const controls = new OrbitControls(this.camera, this.refs['renderer']._THREErenderer.domElement)
        controls.addEventListener('change', this.cameraChanged);
    }

    componentWillUpdate() {
        this.configure();
    }

    configure() {
        let container = document.getElementById('root');
        this.width = this.props.width;
        this.height = this.props.height;
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
            let m = v.getBoundedMagnitude();
           if(m > MAX_SIZE){
               MAX_SIZE = m;
           }
        });
        [...this.props.calculations].forEach(([id,c]) => {
            let m = c.calculate(this.props.vectors).getBoundedMagnitude();
            if(m > MAX_SIZE){
                MAX_SIZE = m;
            }
        });

        return (
            <ReactTHREE.Renderer
                width={this.width}
                height={this.height}
                background={'#ffffff'}
                sortObjects={false}
                ref={'renderer'}
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
        var origin = new THREE.Vector3(2 * vector.fromx, 2* vector.fromy, 2* vector.fromz);

        var total = Operations.add(v, origin);
        total = new THREE.Vector3(total.x, total.y, total.z);

        var boxGeometry = new THREE.BoxGeometry(scale, scale, v.length());

        var sphereGeometry = new THREE.SphereGeometry(0.3);


        var material = solid ?
            new THREE.MeshBasicMaterial({color: vector.colour.num})
            :
            new THREE.MeshBasicMaterial({color: COLOURS.orange.num})

        boxGeometry.lookAt(v);

        var midpoint = new THREE.Vector3(total.x/2, total.y/2, total.z/2)

        var vector = [
            <ReactTHREE.Mesh
                position={midpoint}
                geometry={boxGeometry}
                material={material}
            />
        ];
        if (showBounds) {
            vector.push(
                <ReactTHREE.Mesh
                    position={midpoint}
                    geometry={new THREE.BoxGeometry(v.x, v.y, v.z)}
                    material={new THREE.MeshBasicMaterial({
                        wireframe: true,
                        color: 0xcfcfcf,
                        transparent: true,
                        opacity: 0.4
                    })}
                />
            );
        }
        vector.push(
            <ReactTHREE.Mesh
                position={new THREE.Vector3(total.x - origin.x/2, total.y - origin.y/2, total.z - origin.z/2)}
                geometry={sphereGeometry}
                material={material}
            />
        )
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