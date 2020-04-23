"use strict";

import utils from "../misc/utils";
import Complex from "complex.js"

function getSmoothHSV(genPixelOutput) {
    if (NumberSystem.isVanilla()) {
        const tolerance = genPixelOutput.squareTolerance; // using formula (log t - log d0) / (log d1 / log d0)
        const d0 = genPixelOutput.oldZ.sub(genPixelOutput.root).abs();
        const d1 = genPixelOutput.z.sub(genPixelOutput.root).abs();
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
    const tolerance = genPixelOutput.squareTolerance; // using formula (log t - log d0) / (log d1 / log d0)
    const d0 = genPixelOutput.oldZ.sub(genPixelOutput.root).abs();
    const d1 = genPixelOutput.z.sub(genPixelOutput.root).abs();
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

export default {
    getSmoothHSV,
    getCrazyHSL
}