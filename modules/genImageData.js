import utils from "./utils";
import complex from "./complex";
import {
    Decimal
} from 'decimal.js';

function gen(obj) {

    return new Promise((res, rej) => {
        let image = [];

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

        const rootlength = roots.length

        for (let y = 0; y < h; y++) {
            image.push([]);
            for (let x = 0; x < w; x++) {
                const zx = utils.convertRange(x + 1, [1, w], rangex);
                const zy = utils.convertRange(y + 1, [1, h], rangey);
                let z = complex.cmx(zx, zy);

                let val = 0;


                for (let iteration = 0; iteration < maxIteration; iteration++) {

                    z.newtStep(f, df, z);

                    for (let i = 0; i < rootlength; i++) {
                        let difference = z.getSubstract(roots[i]);

                        if (difference.getAbsSquared().lt(tolerance)) {
                            val = [iteration, i];
                        }
                    }
                }

                image[y].push(val);

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

function gen2(obj) {


    return new Promise((res, rej) => {
        let image = [];

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

        if (!(w || h || maxIteration || roots.length || tolerance)) rej("Shitty input");


        const rootlength = roots.length
        const baseRangeX = [1, w];
        const baseRangeY = [1, h];

        for (let y = 0; y < h; y++) {
            image.push([]);
            for (let x = 0; x < w; x++) {
                const zx = utils.convertRange(x + 1, baseRangeX, rangex);
                const zy = utils.convertRange(y + 1, baseRangeY, rangey);
                let z = complex.cmxt(zx, zy);

                let val = 0;

                for (let iteration = 0; iteration < maxIteration; iteration++) {

                    z = complex.newtStep(f, df, z);
                    for (let i = 0; i < rootlength; i++) {

                        if (complex.getDist(z, roots[i]).lt(tolerance)) {
                            val = [iteration, i];
                        }
                    }
                }

                image[y].push(val);

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



export default {
    gen,
    gen2
}