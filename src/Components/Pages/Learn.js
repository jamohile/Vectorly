import React, {Component} from 'react'
import '../../App.css'
import Visualizer from "../UIElements/Visualizer/Visualizer";
import {Vector} from "../Math/Vector";
import {COLOURS} from "../Colours";

import {Link} from 'react-router-dom'

export default class Learn extends Component {

    render() {
        const visWidth = Math.min(window.innerWidth - 32, 400);

        return (
            <div className={'page'}>
                <div className={'controls'}>
                    <Link to={'/app'}>Calculator</Link>
                </div>

                <div className={'logo'}>
                    <img src={'/images/v.png'}/>
                    Vectorly
                </div>

                <div className={'divider'}/>
                <p>
                    <i>This page is interactive. Feel free to play around!</i>
                </p>
                <h1>
                    What's a vector?
                </h1>

                <p>
                    Most numbers have only one part, their <b>magnitude</b>. This simply indicates how large they are,
                    or their <b>distance from zero</b>.
                    We call these numbers <b>scalars</b>.
                </p>

                <br/>

                <p>
                    <b>Vectors</b> however, have both a magnitude and a direction. On a graph, they are usually
                    represented by an arrow. In writing, they are represented by a letter with a horizontal arrow above
                    it.
                    In this page, the arrow will be excluded, but it will be made clear when a quantity is a vector.
                </p>

                <br/>

                <p>
                    For example, while "5km" is a scalar, "5km [North]" is a vector.

                    <div className={'card'}>
                        <Visualizer
                            vectors={[new Vector(10, 10, 0, true, false, 'Vector', COLOURS.blue)]}
                            width={visWidth}
                            height={400}
                        />
                    </div>
                </p>

                <div className={'divider minor'}/>
                <h1>
                    Why do they matter?
                </h1>

                <p>
                    Most parts of the real world are better represented through vectors. Wind, a runner's
                    acceleration, and the force of gravity
                    are all quantities that don't have much meaning without their respective directions.

                    This becomes even more obvious when working in higher dimensions. Consider the two vectors below.

                    <div className={'card'}>
                        <Visualizer
                            vectors={[new Vector(10, 0, 0, true, false, 'X', COLOURS.orange), new Vector(0, 10, 0, true, false, 'Y', COLOURS.green)]}
                            width={visWidth}
                            height={400}
                            editable
                        />
                    </div>

                    Even though both quantities have the same magnitude, or size, they point in different directions.
                    Imagine an airplane whose velocity
                    is represented by either of these vectors...it's obvious that direction matters.
                </p>

                <div className={'divider minor'}/>

                <h1 id={'representations'}>
                    Representing Vectors
                </h1>

                <p>
                    There are many different ways to represent vectors. The simplest way is a magnitude, then a
                    direction in brackets. This is known as the <b>geometric representation </b>. For example,
                    <ul>
                        <li>5km [North]</li>
                        <li>20km/h [N 20° W]</li>
                    </ul>

                    To use this method, the precise direction of the vector must be known, and expressed relative to
                    some known direction, such as North.

                    This is often used in 2D situations, but becomes impractical in higher dimensions.

                    <br/>
                    <br/>

                    <b>Why?</b> In three dimensions, there are three axes.
                    If someone says a vector has an angle of 20°, what does this mean? Is that between X and Y, or X and
                    Z, or Y and Z?
                    The vector's direction must be expressed relative to each of these axes individually.

                    <br/>
                    <br/>
                    To solve this, we use <b>components</b>. With component notation, a vector is broken into multiple
                    numbers, or components,
                    each representing its magnitude in one dimension. Here, we write a vector as (X, Y, Z) replacing
                    each letter with the magnitude in that direction.
                    The beauty of this notation, is that the direction is now encoded into the magnitude. We can make
                    three right angle triangles with XY, XZ, and YZ, and calculate the angles of each.

                    <br/>
                    <br/>

                    Consider the vector below, and try modifying its
                    components in each dimension.

                    <br/>

                    <div className={'card'}>
                        <Visualizer
                            vectors={[new Vector(10, 10, 0, true, false, 'Vector', COLOURS.blue)]}
                            width={visWidth}
                            height={400}
                            editable
                        />
                    </div>
                </p>

                <div className={'divider minor'}/>

                <h1>Math With Vectors</h1>
                <p>
                    The most useful part about using components is how easily they allow us to perform vector math.
                    There are three "simple" operations we can perform.
                    <ol>
                        <li>Addition</li>
                        <li>Subtraction</li>
                        <li>Scalar Multiplication</li>
                        <li>Magnitude</li>
                        <li>Unit Vectors</li>
                    </ol>
                </p>

                <h2>
                    Addition & Subtraction
                </h2>
                <p>
                    For vector addition and subtraction, simply add or subtract the respective components.
                    For example, (1, 1, 1) + (2, 2, 2) is (3, 3, 3).

                    <br/>
                    <br/>
                    Head to the <i>Calculations</i> tab, and add a new calculation to experiment with this below.

                    <br/>
                    <br/>

                    <div className={'card'}>
                        <Visualizer
                            vectors={[new Vector(10, 0, 0, true, false, 'A', COLOURS.red), new Vector(0, 10, 0, true, false, 'B', COLOURS.gold)]}
                            width={visWidth}
                            height={400}
                            editable
                        />
                    </div>
                </p>

                <h2>
                    Scalar Multiplication
                </h2>
                <p>
                    Although it may sound complicated, scalar multiplication simply means multiplying a vector by a
                    scalar (a number without a direction).
                    Here, multiply each component of the vector by the scalar. For example, 2 * (1, 1, 1) is (2, 2, 2).
                </p>

                <h2 id={'magnitude'}>
                    Magnitude
                </h2>
                <p>
                    Represented by ||v||, this operation converts the vector v into a scalar, by <b>finding its
                    length</b>.
                    If working in 2 dimensions, the pythagorean theorem can be used since the components form a right
                    angled triangle.
                    In three dimensions, the pythagorean theorem is easily extended: d2 = a2 + b2 + c2, where d is the
                    length.

                </p>

                <h2 id={'unit'}>
                    Unit Vectors
                </h2>
                <p>
                    We just covered scalar multiplication and magnitude, these concepts can be combined to create unit
                    vectors.
                    All vectors have a length, otherwise known as their magnitude, and a direction.
                    Every vector also has an associated unit vector: <b>a vector with the same direction, but a
                    magnitude of 1</b>

                    <br/>
                    <br/>
                    That is, a unit vector is a scalar multiple of a vector, with a magnitude of 0. Given a vector v, we
                    can find its unit vector as follows:
                    <br/>
                    <span className={'highlight'}>v / ||v||</span>.
                    <br/>
                    By multiplying a vector by 1 over its magnitude, we effectively cancel out its magnitude.

                    <h3>
                        Why does this matter?
                    </h3>
                    Unit vectors are useful as they allow you to use a vector's direction while ignoring the effects of
                    its magnitude.
                    This is particularly important in projection, as you'll see later.

                    <h3>
                        i, j, and k
                    </h3>
                    The three most common unit vectors are so important, they are given permanent names: i, j, and k.
                    These unit vectors lie on the x, y, and z axes respectively.
                    By using these unit vectors, we can deal with vectors algebraically more easily. For example:
                    <br/>
                    <span className={'highlight'}>(1, 5, 4)</span>
                    <br/>
                    can be represented as:
                    <br/>
                    <span className={'highlight'}>1i + 5j + 4k</span>
                    <br/>
                    <br/>
                    <span
                        className={'note'}>When written, unit vectors generally have a carat (^) on top of them.</span>
                </p>

                <div className={'divider minor'}/>

                <h1>Vector Multiplication</h1>
                <p>
                    Things get a bit more complicated when we talk about vector multiplication. There are two types,
                    neither of which are like scalar multiplication.
                    <ol>
                        <li>Dot Product</li>
                        <li>Cross Product</li>
                    </ol>
                </p>

                <h2>Dot Product</h2>
                <p>
                    The simpler of the two is the dot product. It is represented by a •, and is the <b>sum of the
                    products of the components</b>.
                    That is, given (1, 2, 3) • (4, 5, 6), the dot product is 1×4 + 2×5 + 3×6. <b>Note:</b> dot product
                    returns a scalar.
                    <br/>
                    <br/>
                    If we have two <a href={'#representations'} className={'hoverable minor'}>geometric</a> vectors, the
                    dot product can be found as ||a|| × ||b|| × cos(θ).
                    That is, the product of the magnitudes and the cosine of the angle between them.
                </p>

                <br/>
                <br/>
                <span className={'note'}>
                        Note that V • W is NOT the same as W • V.
                    </span>

                <h2>Cross Product</h2>
                <p>
                    Now we have cross product. It is represented by a ×, which is <b>NOT</b> the same as its scalar
                    counterpart.
                    While dot product returns a scalar, cross product returns another vector. This vector, let's call it
                    u, is perpendicular to both original vectors.
                    Its magnitude, or length, is proportional to the original vectors' lengths.

                    <br/>
                    <br/>

                    Given vectors v: (a, b, c) and w: (x, y, z), v × w is:

                    <br/>
                    <span className={'highlight'}> (bz-cy, cx-az, ay-bx) </span>

                    <br/>
                    <br/>
                    Given the same vectors, but geometrically, cross product is ||v|| × ||w|| × cos(θ).
                    Note that in this equation, magnitudes are scalars, therefore × represents scalar multiplication.
                </p>

                <div className={'divider minor'}/>

                <h1>
                    Projections
                </h1>
                <p>
                    Sometimes, it is useful to know how much of one vector <b>acts</b> in the direction of another
                    vector.
                    That is, how much of vector A is going in the same direction as vector B? For example, if we have a
                    plane with a given speed and heading,
                    we may want to know how quickly it is moving North and West individually.

                    <br/>
                    <br/>
                    Think back to the components we use to describe vectors. Really, these are just projections! The x,
                    y, and z components are just the projections
                    of the vector onto the x, y, and z axes.
                    <br/>
                    <br/>

                    To calculate the magnitude of the projection of vector V onto vector W, we use the following:
                    <br/>
                    <span className={'highlight'}>(V • W) / ||W||.</span>

                    <br/>
                    To find the vector form of this projection, we multiply the above magnitude by the <a href={'#unit'}
                                                                                                          className={'minor'}> unit
                    vector </a> of W.
                    This <i>points</i> the projection in the same direction as W.
                </p>

                <div className={'divider minor'}/>
                <h2>Perpendicular Projections</h2>
                <p>
                    Similarly, sometimes we want to know how much of A acts perpendicularly to B.
                    We calculate this as:
                    <br/>
                    <span className={'highlight'}>
                        A - (A project onto B)
                    </span>
                </p>


                <div className={'divider'}/>
                <p>
                    <i>These can be hard to do by hand! That's why Vectorly does them for you. </i>
                    By now you have a basic understanding of vectors. Head to the <a href={'/'}
                                                                                     className={'minor'}>calculator</a> to
                    perform more complex operations.
                </p>

                <br/>
                <br/>

            </div>
        )
    }
}