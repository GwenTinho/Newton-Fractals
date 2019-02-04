import utils from "./utils";
import complex from "./complex";
import {
    Decimal
} from "decimal.js";

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
        let pi = new Decimal("3.141592653589793238462643383279");
        roots.push(complex.pol(1, pi.mul(2 * i).div(n)));
    }

    return {
        f,
        df,
        w,
        h,
        maxIteration: iterations,
        tolerance: new Decimal(1e-7),
        roots,
        rangex: [-1.3, 1.3],
        rangey: [-1.3, 1.3]
    };
}

export default {
    getPresetOfOrderN
}