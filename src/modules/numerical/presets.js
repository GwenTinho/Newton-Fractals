"use strict";
import Complex from "complex.js";
import helperFunctions from "./helperfunctions";

// complex newtons method
function newtStep(f, df, z) {
    const fz = f(z);
    const dfz = df(z);

    return z.sub(fz.div(dfz));
}

function getPresetOfOrderN(settings) { // implement complex exponents find solutions + and implement it as a function

    const
        n = new Complex({
            re: settings.n,
            im: 0
        }),
        w = settings.w,
        h = settings.h,
        a = settings.a,
        tolerance = 1e-10;


    const complexA = new Complex({
        re: a.real,
        im: a.imag
    });

    let baseRange // = [-100, 100]

    let stepFunction = z => {
        let v = z.mul(n.sub(a));
        let w = z.pow(1 - n).mul(complexA);
        let wplusv = v.add(w);
        return wplusv.div(n);
    }

    let roots = [];

    for (let i = 0; i < n; i++) {
        let pi = Math.PI;
        roots.push(new Complex({
            r: 1,
            phi: pi * 2 * i / n
        }));
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
        tolerance = 1e-14;


    const complexA = new Complex({
        re: a.real,
        im: a.imag
    });

    let baseRange // = [-100, 100]

    let stepFunction = z => z.sub(Complex.tan(z).mul(complexA));

    const pi = Complex.PI;

    let roots = [Complex.ZERO];

    for (let i = 1; i < n; i++) {
        roots.push(new Complex({
            re: i * pi,
            im: 0
        }));
        roots.push(complex.cmx({
            re: -i * pi,
            im: 0
        }));
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