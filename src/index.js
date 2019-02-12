import utils from "../src/modules/utils";
import drawJPEG from "./modules/draw";
import complex from "./modules/complex";
import {
    Decimal
} from "decimal.js";
import presets from "./modules/presets";

////settings

const settings = {
    n: 10,
    w: 50,
    h: 50,
    scalingPattern: [4]
}

// let testPresets = presets.getPresetOfOrderN({
//     n: 10,
//     w: 1,
//     h: 1,
//     iterations: 10,
//     scalingPattern: [4]
// })();

// find iteration number from rangex and rangey divided by w and h giving you the smalled possible value per pixel

// console.log(utils.findMaxIterationPerPixel(200, [-1.3, 1.3], new Decimal(utils.tenToTheMinus(20)), testPresets.stepFunction, testPresets.roots));

drawJPEG(utils.getStatistics(settings));