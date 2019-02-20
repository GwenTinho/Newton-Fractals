"use strict";

import utils from "../misc/utils";
import complex from "./complex";
import NumberSystem from "./numberSystem";


function getPresetOfOrderN(settings) {



    const
        n = settings.n,
        w = settings.w,
        h = settings.h,
        a = settings.a,
        tolerance = new NumberSystem(utils.tenToTheMinus(10));


    const complexA = complex.cmx(a.real, a.imag);

    let stepFunction = z => {
        let v = z.getInstance().cmultiply(complex.cmx(n - a.real, a.imag));
        let w = z.getCexp(1 - n).cmultiply(complexA);
        let wplusv = v.getAddition(w);
        return wplusv.divByReal(n);
    }

    let roots = [];

    for (let i = 0; i < n; i++) {
        let pi = NumberSystem.acos(-1);
        roots.push(complex.pol(1, pi.mul(2 * i).div(n)));
    }

    const sideLength = settings.w * settings.scalingPattern.reduce((acc, currV) => acc *= currV);

    console.log("Getting max iterations...");

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