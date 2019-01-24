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

        if (!(w || h || maxIteration || roots.length || tolerance)) rej("Shitty input");

        const rootlength = roots.length

        for (let y = 0; y < h; y++) {
            image.push([]);
            for (let x = 0; x < w; x++) {
                const zx = utils.convertRange(x + 1, [1, w], rangex);
                const zy = utils.convertRange(y + 1, [1, h], rangey);
                let z = complex.cmx(zx, zy);

                let val = 0;

                let prevZ = z.getInstance();

                for (let iteration = 0; iteration < maxIteration; iteration++) {

                    z.substract(f(z).divide(df(z)));

                    let cmp = prevZ.getInstance().substract(z);

                    if (cmp.imag < 0 && cmp.real < 0) {
                        iteration = maxIteration - 1;
                        continue;
                    }

                    prevZ = z.getInstance();

                    for (let i = 0; i < rootlength; i++) {
                        let difference = z.getInstance().substract(roots[i]);

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

export default {
    gen
}