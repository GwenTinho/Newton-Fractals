import utils from "./utils";
import complex from "./complex";
import {
    Decimal
} from "decimal.js";

Decimal.set({
    precision: 30
});

function getPresetOfOrderN(settings) {
    const
        n = settings.n,
        w = settings.w,
        h = settings.h,
        iterations = settings.iterations;

    let f = z => {
        let v = z.getCexp(n);
        v.real = v.real.sub(1);
        return v;
    }
    let df = z => {
        return z.getCexp(n - 1).multiplyByReal(n);
    }

    let roots = [];

    for (let i = 0; i < n; i++) {
        let pi = Decimal.acos(-1);
        roots.push(complex.pol(1, pi.mul(2 * i).div(n)));
    }

    return {
        f,
        df,
        w,
        h,
        maxIteration: iterations,
        tolerance: new Decimal("0.00000000000000000001"),
        roots,
        rangex: [-1.3, 1.3],
        rangey: [-1.3, 1.3]
    };
}

export default {
    getPresetOfOrderN
}