import utils from "./utils";
import complex from "./complex";

function genOne(hy, wx, settings) {

    const roots = settings.roots;
    const maxIteration = settings.maxIteration;
    const rootlength = roots.length;
    const zx = utils.convertRange(wx + 1, [1, settings.w], settings.rangex);
    const zy = utils.convertRange(hy + 1, [1, settings.h], settings.rangey);

    let z = complex.cmx(zx, zy);

    for (let iteration = 0; iteration < maxIteration; iteration++) {

        z = complex.newtStep(settings.f, settings.df, z);

        for (let i = 0; i < rootlength; i++) {

            if (complex.getSqrDist(z, roots[i]).lt(settings.tolerance)) {
                return [iteration, i];
            }
        }
    }

    return [-1, -1];
}

function genGrid(settings) {
    let grid = new Array(settings.h);

    for (let j = 0; j < settings.h; j++) {
        grid[j] = new Array(settings.w);
        for (let i = 0; i < settings.w; i++) {
            grid[j][i] = genOne(j, i, settings);
        }
    }

    return grid;
}

function procedualGen(settings, scaling, steps, boundaries) { //improve proc gen by reusing maps

    return new Promise(async (res, rej) => {
        console.log("Generating initial grid ...")

        let grid = genGrid(settings);

        console.log("Done.");

        let outSettings = settings;

        for (let index = 0; index < steps; index++) {
            console.log("Mapping nr. " + (index + 1) + " ...");
            const val = oneStepProcGen(grid, outSettings, scaling, boundaries);
            grid = val.grid;
            outSettings = val.settings;
            console.log("Done.");
        }

        console.log("Done.\nResolving Promise!");

        res({
            image: grid,
            w: outSettings.w,
            h: outSettings.h,
            rootlength: outSettings.roots.length,
            maxIteration: outSettings.maxIteration
        });
    });
}

function oneStepProcGen(grid, settings, scaling, boundaries) {

    const map = getMap(grid, boundaries);
    const lMap = map.length;
    const scaledGrid = multGrid(scaling, grid.length);


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
                        scaledGrid[y + scaledJ][x + scaledI] = genOne(y + scaledJ, x + scaledI, scaledSettings);
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

function multGrid(scaling, gridlength) {

    const scaledL = gridlength * scaling;
    let map = new Array(scaledL);

    for (let i = 0; i < scaledL; i++) {
        map[i] = new Array(scaledL);
    }

    return map;
}

function getMap(grid, boundaries) {

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

                    if (grid[row][col][0] !== grid[j][i][0] || grid[row][col][1] !== grid[j][i][1]) needsRecalc = true;
                }
            }
            map[j][i] = needsRecalc;
        }
    }
    return map;
}


export default {
    procedualGen
}