"use strict";

import utils from "../misc/utils";
import complex from "../numerical/complexWrapper";
import NumberSystem from "../numerical/numberSystem";

function getSmoothHSV(genPixelOutput) {
    if (NumberSystem.isVanilla()) {
        const tolerance = genPixelOutput.squareTolerance; // using formula (log t - log d0) / (log d1 / log d0)
        const d0 = complex.getSqrDist(genPixelOutput.oldZ, genPixelOutput.root);
        const d1 = complex.getSqrDist(genPixelOutput.z, genPixelOutput.root);
        const logd0 = NumberSystem.ln(d0);

        const numerator = NumberSystem.ln(tolerance).sub(logd0);
        const denominator = NumberSystem.ln(d1).sub(logd0);

        const value = numerator.div(denominator).number;

        const valueNormalized = 1 - ((genPixelOutput.iteration + value) / genPixelOutput.maxIteration);

        const hsv = {
            h: utils.convertRange(genPixelOutput.rootIteration, [0, genPixelOutput.rootLength - 1], [0, 240]),
            s: 0.6667,
            v: valueNormalized
        };


        return hsv;
    }
}

function getCrazyHSL(genPixelOutput) {
    if (NumberSystem.isVanilla()) {
        const tolerance = genPixelOutput.squareTolerance; // using formula (log t - log d0) / (log d1 / log d0)
        const d0 = complex.getSqrDist(genPixelOutput.oldZ, genPixelOutput.root);
        const d1 = complex.getSqrDist(genPixelOutput.z, genPixelOutput.root);
        const logd0 = NumberSystem.ln(d0);

        const numerator = NumberSystem.ln(tolerance).sub(logd0);
        const denominator = NumberSystem.ln(d1).sub(logd0);

        const value = numerator.div(denominator);

        const hsl = {
            h: utils.convertRange(genPixelOutput.rootIteration, [0, genPixelOutput.rootLength - 1], [0, 240]),
            s: 100,
            l: utils.convertRange(value * 100, [0, 100], [20, 80])
        };

        return hsl;
    }
}

export default {
    getSmoothHSV,
    getCrazyHSL
}