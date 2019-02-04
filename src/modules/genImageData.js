import utils from "./utils";
import complex from "./complex";
import {
    Decimal
} from 'decimal.js';

function genOne(hy, wx, settings) {

    const
        f = settings.f,
        df = settings.df,
        w = settings.w,
        h = settings.h,
        maxIteration = settings.maxIteration,
        tolerance = settings.tolerance,
        rangex = settings.rangex,
        rangey = settings.rangey,
        roots = settings.roots;

    const baseRangeX = [1, w];
    const baseRangeY = [1, h];
    const rootlength = roots.length
    const zx = utils.convertRange(wx + 1, baseRangeX, rangex);
    const zy = utils.convertRange(hy + 1, baseRangeY, rangey);
    let z = complex.cmx(zx, zy);

    let val = [-1, -1];


    for (let iteration = 0; iteration < maxIteration; iteration++) {

        z = complex.newtStep(f, df, z);

        for (let i = 0; i < rootlength; i++) {

            if (complex.getDist(z, roots[i]).lt(tolerance)) {
                val = [iteration, i];
            }
        }
    }

    return val;
}

function genGrid(settings) {
    let map = new Array(settings.h);

    for (let j = 0; j < settings.h; j++) {
        map[j] = new Array(settings.w);
        for (let i = 0; i < settings.w; i++) {
            map[j][i] = genOne(j, i, settings);
        }
    }

    return map;
}

function procedualGen(settings, scaling, steps, boundaries) {

    return new Promise(async (res, rej) => {
        let grid = genGrid(settings);

        let outSettings = settings;

        for (let index = 0; index < steps; index++) {
            const val = oneStepProcGen(grid, outSettings, scaling, boundaries);
            grid = val.grid;
            outSettings = val.settings;
        }

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


    let map = getMap(grid, boundaries);

    const lMap = map.length;

    const scaledGrid = multGrid(scaling, grid);
    const scaledSettings = {
        f: settings.f,
        df: settings.df,
        w: settings.w * scaling,
        h: settings.h * scaling,
        maxIteration: settings.maxIteration,
        tolerance: settings.tolerance,
        rangex: settings.rangex,
        rangey: settings.rangey,
        roots: settings.roots
    }

    for (let j = 0; j < lMap; j++) {
        for (let i = 0; i < lMap; i++) {
            if (map[j][i]) {
                for (let y = 0; y < scaling; y++) {
                    for (let x = 0; x < scaling; x++) {
                        scaledGrid[y + scaling * j][x + scaling * i] = genOne(y + scaling * j, x + scaling * i, scaledSettings);
                    }
                }
            } else {
                for (let y = 0; y < scaling; y++) {
                    for (let x = 0; x < scaling; x++) {
                        scaledGrid[y + scaling * j][x + scaling * i] = grid[j][i];
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

function multGrid(scaling, grid) {

    const l = grid.length;

    let map = new Array(l * scaling);

    for (let i = 0; i < l * scaling; i++) {
        map[i] = new Array(l * scaling);
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