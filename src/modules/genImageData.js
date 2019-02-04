import utils from "./utils";
import complex from "./complex";
import {
    Decimal
} from 'decimal.js';

function gen(obj) {

    return new Promise((res, rej) => {


        const
            f = obj.f,
            df = obj.df,
            w = obj.w,
            h = obj.h,
            maxIteration = obj.maxIteration,
            tolerance = obj.tolerance,
            rangex = obj.rangex,
            rangey = obj.rangey,
            roots = obj.roots;

        if (!(w || h || maxIteration || roots.length || tolerance)) rej("bad input");


        const image = new Array(h);

        const baseRangeX = [1, w];
        const baseRangeY = [1, h];
        const rootlength = roots.length

        for (let y = 0; y < h; y++) {
            image[y] = new Array(w);
            const zy = utils.convertRange(y + 1, baseRangeY, rangey);

            for (let x = 0; x < w; x++) {
                const zx = utils.convertRange(x + 1, baseRangeX, rangex);

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

                image[y][x] = val;

            }
        }
        res({
            image,
            rootlength,
            w,
            h,
            maxIteration
        });
    });
}

function procedualGen(settings, stepSize, steps) {

    return new Promise(async (res, rej) => {
        let {
            image
        } = await gen(settings);

        console.log("fetched image")

        const grid = image;

        let map = new Array(grid.length);

        map.fill(new Array(grid.length));

        const lminus1 = grid.length - 1;

        for (let j = 0; j < grid.length; j++) {
            for (let i = 0; i < grid.length; i++) {

                let needsRecalc = false,
                    x = -1,
                    y = -1;

                while (y < 2 && !needsRecalc) {
                    while (x < 2 && !needsRecalc) {

                        if (x === 0 && y === 0) {
                            x++;
                            continue;
                        }

                        const col = x + i;
                        const row = y + j;
                        x++;
                        if (col > lminus1) continue;
                        if (col < 0) continue;
                        if (row > lminus1) continue;
                        if (row < 0) continue;

                        if (grid[row][col][0] !== grid[j][i][0] || grid[row][col][1] !== grid[j][i][1]) needsRecalc = true;


                    }
                    y++;
                }
                map[j][i] = needsRecalc;
            }
        }
        res({
            image: map,
            w: grid.length,
            h: grid.length
        });
    });
}


export default {
    gen,
    procedualGen
}