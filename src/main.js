import Label from './display/Label';
import Layer from './display/Layer';
import Stage from './display/Stage';
import Axis from './display/shape/Axis';
import Grid from './display/shape/Grid';
import UIContainer from './dom-ui/UIContainer';

const UNIT = 80;

// GRID
const grid = new Layer(Layer.ORIGIN__CENTER, Layer.TYPE__ISO, UNIT);
grid.name = 'grid';
grid.add([
    new Grid(10),
    new Axis(20)
]);

// WORLD
const world = new Layer(Layer.ORIGIN__CENTER, Layer.TYPE__ISO, UNIT);
world.name = 'world';
world.addGridPath();

// FPS
const ui = new Layer(Layer.ORIGIN__TOP_LEFT, Layer.TYPE__2D, 1);
ui.name = 'ui';
const labelFPS = new Label({ color: 0x0, position: [0, 0, 0], text: '', align: 'left', baseline: 'top' });
ui.add([labelFPS]);

// STAGE
const stage = new Stage(Stage.SCREEN_RESOLUTION__RETINA);
stage.preloadImage('img/boy.png');
stage.preloadImage('img/trees.png');
stage.add([grid, world, ui]);
stage.showFPS(fps => labelFPS.text(`fps: ${fps}`));
stage.render();


// DOM-UI
const UI_cont = new UIContainer(world);
document.body.appendChild(UI_cont.element);
UI_cont.init();
