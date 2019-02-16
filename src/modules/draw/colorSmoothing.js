"use strict";

import utils from "../misc/utils";
import complex from "../numerical/complex";
import NumberSystem from "../numerical/numberSystem";

function getSmoothHSV(genPixelOutput) {
    if (NumberSystem.isVanilla()) {
        const tolerance = genPixelOutput.squareTolerance; // using formula (log t - log d0) / (log d1 / log d0)
        const d0 = complex.getSqrDist(genPixelOutput.oldZ, genPixelOutput.root);
        const d1 = complex.getSqrDist(genPixelOutput.z, genPixelOutput.root);
        const logd0 = NumberSystem.log(d0);

        const numerator = NumberSystem.log(tolerance).sub(logd0);
        const denominator = NumberSystem.log(d1).sub(logd0);

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

export default {
    getSmoothHSV
}