"use strict";

import utils from "./utils";
import complex from "./complex";
import NumberSystem from "./NumberSystem";


function getPresetOfOrderN(settings) {



    const
        n = settings.n,
        w = settings.w,
        h = settings.h,
        tolerance = new NumberSystem(utils.tenToTheMinus(10));


    let stepFunction = z => {
        let v = z.getInstance().multiplyByReal(n - 1);
        let w = z.getCexp(1 - n);
        let wplusv = v.getAddition(w);
        return wplusv.divByReal(n);
    }

    let roots = [];

    for (let i = 0; i < n; i++) {
        let pi = NumberSystem.acos(-1);
        roots.push(complex.pol(1, pi.mul(2 * i).div(n)));
    }

    const sideLength = settings.w * settings.scalingPattern.reduce((acc, currV) => acc *= currV);

    const iterations = utils.findMaxIterationPerPixel(sideLength, [-1.3, 1.3], tolerance, stepFunction, roots);

    console.log("Maxiterations for this drawing is " + iterations);

    return () => {
        return {
            w,
            h,
            stepFunction,
            maxIteration: iterations,
            tolerance,
            roots,
            rangex: [-1.3, 1.3],
            rangey: [-1.3, 1.3]
        };
    }
}

export default {
    getPresetOfOrderN
}