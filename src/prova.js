import Layer from './display/Layer';
import Axis from './display/shape/Axis';
import Cube from './display/shape/Cube';
import Grid from './display/shape/Grid';
import Pyramid from './display/shape/Pyramid';
import Stage from './display/Stage';
import Cylinder from './display/shape/Cylinder';
import Diamond from './display/shape/Diamond';
import Rubik from './display/shape/Rubik';
import Label from './display/Label';
import Human from './samples/Human';
import Tree from './samples/Tree';
import Stairs from './display/shape/Stairs';
import Ramp from './display/shape/Ramp';
import Point from './core/Point';
import Path from './core/Path';
import Shape from './display/Shape';
import Boy from './samples/Boy';
import Color from './core/Color';
import UIShape from './dom-ui/UIShape';
import UISprite from './dom-ui/UISprite';
import UIStage from './dom-ui/UIStage';
import UIContainer from './dom-ui/UIContainer';

const cube1 = new Cube({ color: 0xdd0000, size: [1, 1, 1], position: [2, 1, .6], rotation: [20, 10, 10] });
const cube2 = new Cube({ color: 0x00dd00, size: [1, 1, .5], position: [2, 1] });
const cube3 = new Cube({ color: 0x0000dd, size: [1, 1, 1.6], position: [0.5, 1] });
const pyramid = new Pyramid({ color: 0xdddd00, size: [1, 1, 2], position: [2, 1, 2], rotation: { y: -50, x: 10 } });
const cylinder = new Cylinder({ color: 0xdd00dd, size: [1, 1, 3], position: [2, 2], rotation: { y: -20 }, segments: 100 });
const diamond = new Diamond({ color: 0x00dddd, size: [.8, .8, 1.5], position: [3, 3], rotation: { x: 20 } });
const rubik = new Rubik({ position: [4, 4] });
const stairs = new Stairs({ color: 0xdd3399, size: [1, 1, 2], position: [0, 0, 0], direction: Stairs.FACE__EE, steps: 5 });
const ramp = new Ramp({ color: 0x33dd99, size: [1, 1, 2], position: [0, 1, 0], direction: Ramp.FACE__EE });

const labelFPS = new Label({ color: 0x0, position: [0, 0, 0], text: '', align: 'left', baseline: 'top' });

// const me = new Boy();
// const tokens = [me];
// for (let t = 0; t < 0; t++) {
//     const h = new Boy();
//     h.moveToRandom();
//     tokens.push(h);
// }

// const trees = [];
// for (let t = 0; t < 0; t++) {
//     trees.push(new Tree());
// }

// cube1
//     .color(0xdd0000)
//     .rotation(20, 10, 10)
//     .position(2, 1, .6);
// cube2
//     .color(0x009900)
//     .extrude(.5)
//     .position(2, 1);
// cube3
//     .color(0x0000dd)
//     .extrude(1.6)
//     .position(0.5, 1);
// pyramid
//     .height(2)
//     .color(0xdddd00)
//     .rotation({ y: -50, x: 10 })
//     .position(2, 1, 2);
// cylinder
//     .height(3)
//     .color(0xdd00dd)
//     .rotation({ y: -20 })
//     .position(2, 2);
// diamond
//     .color(0x009999)
//     .rotation({ x: 20 })
//     .position(3, 3);

const UNIT = 70;
const world = new Layer(Layer.ORIGIN__CENTER, Layer.TYPE__ISO, UNIT);
world.addGridPath();
// world.subscribe('click', (e, d) => {
//     // console.log('clicked on world at', d.tile);
//     me.moveToTarget(d.tile);
// });

// world.add([cube1, cube2, cube3, pyramid, cylinder, diamond]);
// world.add([ramp, stairs]);
// world.add(tokens);
// world.add(trees);

// const monument = new Layer(Layer.ORIGIN__CENTER, Layer.TYPE__ISO, UNIT);
// monument.add([
//     new Stairs({ color: 0xcccccc, size: [2, 3, 2], position: [0, 0, 1] })
// ]);

const grid = new Layer(Layer.ORIGIN__CENTER, Layer.TYPE__ISO, UNIT);
grid.add([
    new Grid(10),
    new Axis(20)
]);

const ui = new Layer(Layer.ORIGIN__TOP_LEFT, Layer.TYPE__2D, 1);
ui.add([labelFPS]);
// ui.subscribe('click', (e, d) => console.log('clicked on UI at', d.position));

const stage = new Stage();
stage.add([grid, world, ui]);
stage.render();
// stage.start();

stage.preloadImage('img/boy.png');
stage.preloadImage('img/trees.png');

stage.showFPS(fps => labelFPS.text(`fps: ${fps}`));

// cube1.step(() => cube1.rotate([1, 1, 1]));
// cube2.step(() => cube2.rotate([1, 1, 1]));
// cube3.step(() => cube3.rotate([1, 1, 1]));
// pyramid.step(() => pyramid.rotate([1, 1, 1]));
// cylinder.step(() => cylinder.rotate([1, 1, 1]));
// diamond.step(() => diamond.rotate([1, 1, 1]));
// stairs.step(() => stairs.rotate({ z: 1 }));
// ramp.step(() => ramp.rotate({ z: 1 }));

// KEYS MAPPING (add new class for this)
// window.addEventListener('keypress', (e) => {
//     switch (e.key) {
//         case 'a':
//             me.moveWest();
//             break;
//         case 's':
//             me.moveSouth();
//             break;
//         case 'd':
//             me.moveEast();
//             break;
//         case 'w':
//             me.moveNorth();
//             break;
//     };
// });

const UI_cont = new UIContainer(world);
document.body.appendChild(UI_cont.element);
UI_cont.init();
