"use strict";

import utils from "../misc/utils";
import complex from "./complex";
import NumberSystem from "./numberSystem";
import helperFunctions from "./helperfunctions";

function getPresetOfOrderN(settings) { // implement complex exponents find solutions + and implement it as a function

    const
        n = settings.n,
        w = settings.w,
        h = settings.h,
        a = settings.a,
        tolerance = new NumberSystem(utils.tenToTheMinus(10));


    const complexA = complex.cmx(a.real, a.imag);

    let baseRange // = [-100, 100]

    let stepFunction = z => {
        let v = z.getInstance().cmultiply(complex.cmx(n - a.real, -a.imag));
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

    let iterations;

    if (settings.iterations) {
        iterations = settings.iterations;
    } else {
        iterations = helperFunctions.findMaxIterationPerPixel(sideLength, baseRange || [-1.3, 1.3], tolerance, stepFunction, roots);
    }


    console.log("Maxiterations for this drawing is " + iterations);

    return () => {
        return {
            w,
            h,
            stepFunction,
            maxIteration: iterations,
            tolerance,
            roots,
            rangex: baseRange || [-1.3, 1.3],
            rangey: baseRange || [-1.3, 1.3]
        };
    }
}

function getSinePreset(settings) {
    const
        n = settings.n,
        w = settings.w,
        h = settings.h,
        a = settings.a,
        tolerance = new NumberSystem(utils.tenToTheMinus(14));


    const complexA = complex.cmx(a.real, a.imag);

    let baseRange // [-0, 2]

    let stepFunction = z => z.getSubstract(complex.tan(z).cmultiply(complexA));

    const pi = NumberSystem.acos(-1);

    let roots = [complex.cmx(0, 0)];

    for (let i = 1; i < n; i++) {
        roots.push(complex.cmx(pi.mul(i), 0));
        roots.push(complex.cmx(pi.mul(-i), 0));
    }

    console.log("Getting max iterations...");

    const iterations = 250;

    console.log("Maxiterations for this drawing is " + iterations);

    return () => {
        return {
            w,
            h,
            stepFunction,
            maxIteration: iterations,
            tolerance,
            roots,
            rangex: baseRange || [1.1, 2],
            rangey: baseRange || [-0.2, 0.2]
        };
    }
}

export default {
    getPresetOfOrderN,
    getSinePreset
}