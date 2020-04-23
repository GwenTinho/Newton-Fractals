"use strict";

import utils from "../misc/utils";
import Complex from "complex.js";

/*
    Calculates all the relevant informations for each pixel
    stepfunction is the actual mathematical recursion relation the rest is all standart fractal stuff (see newton fractal wikipedia page)
    this function is the hearth of the whole thing all the other functions essentially fill a 2d array with information gathered from this function
*/

function getPixelInfo(hy, wx, settings) {

    const roots = settings.roots;
    const maxIteration = settings.maxIteration;
    const rootLength = roots.length;
    const zx = utils.convertRange(wx + 1, [1, settings.w], settings.rangex);
    const zy = utils.convertRange(hy + 1, [1, settings.h], settings.rangey);
    const stepFunction = settings.stepFunction;

    let z = new Complex({
        re: zx,
        im: zy
    });

    for (let iteration = 0; iteration < maxIteration; iteration++) {
        let oldZ = z;
        z = stepFunction(z);

        for (let i = 0; i < rootLength; i++) {
            if (z.sub(roots[i]).abs() < settings.tolerance) {

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

/*
    This function is needed for the next few functions that try to optimize the drawing, as most regions have the same color
    you can map out the regions that need to be recalculated after generating a smaller version of the finished set
    essentially scaling the whole array until you have your result. getInitialGrid gives you the first iteration of these sets
*/

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


// fullfills one step of the resizing of the array

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

/*
    As stated above this looks for and marks the regions that need to be recalculated the rest of the 2d array that is now scaled can be filled with the old value
*/

function getOptmizationMap(grid, boundaries) {

    const lminus1 = grid.length - 1;
    const l = grid.length;

    let map = new Array(l);

    const boundariesUpper = boundaries; // it looks inside a boundary around one of the values in the 2d array to check whether the values around it stay constant or change
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

                    if (grid[row][col].iteration !== grid[j][i].iteration || grid[row][col].rootIteration !== grid[j][i].rootIteration) needsRecalc = true; // in this case it needs to be recalculated
                }
            }
            map[j][i] = needsRecalc;
        }
    }
    return map;
}

//scales the 2d array to a different size

function scaleGrid(scaling, gridlength) {

    const scaledL = gridlength * scaling;
    let map = new Array(scaledL);

    for (let i = 0; i < scaledL; i++) {
        map[i] = new Array(scaledL);
    }

    return map;
}

/*
    Just finds an estimate for the iterations needed 
    // revise this
*/

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

/*
    Puts all the functions together for the final 2d array
*/


function procedualGen(settings, scalingPattern, boundaries) { //improve proc gen by reusing maps

    console.log("Generating initial grid ...")

    let grid = getInitialGrid(settings);

    let outSettings = settings;

    for (let index = 0; index < scalingPattern.length; index++) {
        console.log("Scaling by a factor of " + scalingPattern[index] + " ...");
        const val = oneStepProcGen(grid, outSettings, scalingPattern[index], boundaries);
        grid = val.grid;
        outSettings = val.settings;
    }

    const avgiterations = getAvgIterations(grid);

    console.log("Avg iterations needed: " + avgiterations);

    return {
        image: grid,
        w: outSettings.w,
        h: outSettings.h,
    };
}


export default {
    procedualGen
}