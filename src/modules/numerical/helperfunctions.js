import complex from "./complexWrapper";

function compareRootsToVal(roots, z, tolerance) {
    let out = false;
    for (let i = 0; i < roots.length; i++) {
        out = out || complex.getSqrDist(z, roots[i]).lt(tolerance);
    }
    return out;
}

function findIterationsNeeded(z, tolerance, stepFunction, roots) {
    let iterationsNeeded = 0;
    while (!compareRootsToVal(roots, z, tolerance)) {
        z = stepFunction(z);
        iterationsNeeded++;
    }
    return iterationsNeeded;
}

function findMaxIterationPerPixel(sideLength, range, tolerance, stepFunction, roots) {
    let minValPerPixel = (range[1] - range[0]) / sideLength;
    const realOnly = findIterationsNeeded(complex.cmx(minValPerPixel, 0), tolerance, stepFunction, roots);
    const imagOnly = findIterationsNeeded(complex.cmx(0, minValPerPixel), tolerance, stepFunction, roots);
    const both = findIterationsNeeded(complex.cmx(minValPerPixel, minValPerPixel), tolerance, stepFunction, roots);
    return Math.max(realOnly, imagOnly, both);
}

function findRoot(startpoint, f, df, tolerance) {
    let z = startpoint;

    while (!f(z).lt(tolerance)) {
        z = complex.newtStep(f, df, z);
    }

    return z;
}

function float2rat(x) { // from http://jonisalonen.com/2012/converting-decimal-numbers-to-ratios/ and https://en.wikipedia.org/wiki/Continued_fraction infinite fractions and convergence
    const tolerance = 1.0E-6;
    let h1 = 1;
    let h2 = 0;
    let k1 = 0;
    let k2 = 1;
    let b = x;
    do {
        let a = Math.floor(b);
        let aux = h1;
        h1 = a * h1 + h2;
        h2 = aux;
        aux = k1;
        k1 = a * k1 + k2;
        k2 = aux;
        b = 1 / (b - a);
    } while (Math.abs(x - h1 / k1) > x * tolerance);

    return [h1, k1]; // h1 is h_n in the formula == numerator | k1 is k_n in the formula == divisor
}

export default {
    findIterationsNeeded,
    findRoot,
    findMaxIterationPerPixel,
    float2rat
}