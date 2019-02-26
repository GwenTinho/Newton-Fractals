import complex from "../numerical/complex";

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

export default {
    findIterationsNeeded,
    findRoot,
    findMaxIterationPerPixel
}