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
    n: 4,
    w: 0,
    h: 0,
    iterations: 10
});



console.log(utils.findIterationsNeeded(complex.cmx(0.01, 0), new Decimal(utils.tenToTheMinus(20)), testPresets.stepFunction, testPresets.roots));

//drawJPEG(utils.getStatistics(settings));