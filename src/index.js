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
    scalingPattern: [5, 4, 2] // 9 hrs
}

let testPresets = presets.getPresetOfOrderN({
    n: 10,
    w: 0,
    h: 0,
    iterations: 10
});

// find iteration number from rangex and rangey divided by w and h giving you the smalled possible value per pixel

console.log(utils.findMaxIterationPerPixel(2000, [-1.3, 1.3], new Decimal(utils.tenToTheMinus(20)), testPresets.stepFunction, testPresets.roots));

//drawJPEG(utils.getStatistics(settings));