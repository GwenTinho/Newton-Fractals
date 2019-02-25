"use strict";

import utils from "../misc/utils";
import complex from "./complex";

function getPixelInfo(hy, wx, settings) {

    const roots = settings.roots;
    const maxIteration = settings.maxIteration;
    const rootLength = roots.length;
    const zx = utils.convertRange(wx + 1, [1, settings.w], settings.rangex);
    const zy = utils.convertRange(hy + 1, [1, settings.h], settings.rangey);
    const stepFunction = settings.stepFunction;

    let z = complex.cmx(zx, zy);

    for (let iteration = 0; iteration < maxIteration; iteration++) {
        let oldZ = z;
        z = stepFunction(z);

        for (let i = 0; i < rootLength; i++) {
            if (complex.getSqrDist(z, roots[i]).lt(settings.tolerance)) {

                return {
                    root: roots[i],
                    rootIteration: i,
                    rootLength,
                    squareTolerance: settings.tolerance,
                    z,
                    oldZ,
                    maxIteration,
                    iteration
                }
            }
        }
    }

    return {
        iteration: -1,
        rootIteration: -1,
    }
}

function getInitialGrid(settings) {
    let grid = new Array(settings.h);

    for (let j = 0; j < settings.h; j++) {
        grid[j] = new Array(settings.w);
        for (let i = 0; i < settings.w; i++) {
            grid[j][i] = getPixelInfo(j, i, settings);
        }
    }

    return grid;
}

function procedualGen(settings, scalingPattern, boundaries) { //improve proc gen by reusing maps

    console.log("Generating initial grid ...")

    let grid = getInitialGrid(settings);

    console.log("Done.");

    let outSettings = settings;

    for (let index = 0; index < scalingPattern.length; index++) {
        console.log("Mapping nr. " + (index + 1) + " ...");
        console.log("Scaling by a factor of " + scalingPattern[index] + " in each direction");
        const val = oneStepProcGen(grid, outSettings, scalingPattern[index], boundaries);
        grid = val.grid;
        outSettings = val.settings;
        console.log("Done.");
    }

    console.log("Done.");

    const avgiterations = getAvgIterations(grid);

    console.log("Avg iterations needed: " + avgiterations);

    return {
        image: grid,
        w: outSettings.w,
        h: outSettings.h,
    };
}

function oneStepProcGen(grid, settings, scaling, boundaries) {

    const map = getOptmizationMap(grid, boundaries);
    const lMap = map.length;
    const scaledGrid = scaleGrid(scaling, grid.length);


    const {
        w,
        h,
        ...rest
    } = settings;

    const scaledSettings = {
        w: settings.w * scaling,
        h: settings.h * scaling,
        ...rest
    }

    for (let j = 0; j < lMap; j++) {
        const scaledJ = scaling * j;
        for (let i = 0; i < lMap; i++) {
            const scaledI = scaling * i;
            if (map[j][i]) {
                for (let y = 0; y < scaling; y++) {
                    for (let x = 0; x < scaling; x++) {
                        scaledGrid[y + scaledJ][x + scaledI] = getPixelInfo(y + scaledJ, x + scaledI, scaledSettings);
                    }
                }
            } else {
                for (let y = 0; y < scaling; y++) {
                    for (let x = 0; x < scaling; x++) {
                        scaledGrid[y + scaledJ][x + scaledI] = grid[j][i];
                    }
                }
            }
        }
    }

    return {
        settings: scaledSettings,
        grid: scaledGrid,
    }

}

function scaleGrid(scaling, gridlength) {

    const scaledL = gridlength * scaling;
    let map = new Array(scaledL);

    for (let i = 0; i < scaledL; i++) {
        map[i] = new Array(scaledL);
    }

    return map;
}

function getOptmizationMap(grid, boundaries) {

    const lminus1 = grid.length - 1;
    const l = grid.length;

    let map = new Array(l);

    const boundariesUpper = boundaries;
    const boundariesLower = -boundaries + 1;

    for (let j = 0; j < l; j++) {
        map[j] = new Array(l)
        for (let i = 0; i < l; i++) {

            let needsRecalc = false;

            for (let y = boundariesLower; y < boundariesUpper && !needsRecalc; y++) {
                for (let x = boundariesLower; x < boundariesUpper && !needsRecalc; x++) {
                    if (x === 0 && y === 0) continue;

                    const col = x + i;
                    const row = y + j;

                    if (col > lminus1) continue;
                    if (col < 0) continue;
                    if (row > lminus1) continue;
                    if (row < 0) continue;

                    if (grid[row][col].iteration !== grid[j][i].iteration || grid[row][col].rootIteration !== grid[j][i].rootIteration) needsRecalc = true;
                }
            }
            map[j][i] = needsRecalc;
        }
    }
    return map;
}

function getAvgIterations(grid) {
    const l = grid.length;
    let avg = 0;
    let n = 0;
    for (let j = 0; j < l; j++) {
        for (let i = 0; i < l; i++) {
            avg = (avg * n + grid[j][i].iteration) / (n + 1);
            n++;
        }
    }
    return avg;
}


export default {
    procedualGen
}