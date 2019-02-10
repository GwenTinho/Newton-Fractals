import utils from "./utils";
import complex from "./complex";
import {
    Decimal
} from "decimal.js";

Decimal.set({
    precision: 24
});

function getPresetOfOrderN(settings) {
    const
        n = settings.n,
        w = settings.w,
        h = settings.h,
        iterations = settings.iterations;

    let stepFunction = z => {
        let v = z.getInstance().multiplyByReal(n - 1);
        let w = z.getCexp(1 - n);
        let wplusv = v.getAddition(w);
        return wplusv.divByReal(n);
    }

    let roots = [];

    for (let i = 0; i < n; i++) {
        let pi = Decimal.acos(-1);
        roots.push(complex.pol(1, pi.mul(2 * i).div(n)));
    }

    return {
        w,
        h,
        stepFunction,
        maxIteration: iterations,
        tolerance: new Decimal(utils.tenToTheMinus(20)),
        roots,
        rangex: [-1.3, 1.3],
        rangey: [-1.3, 1.3]
    };
}

export default {
    getPresetOfOrderN
}