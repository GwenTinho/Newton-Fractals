import utils from "./utils";
import complex from "./complex";
import {
    Decimal
} from "decimal.js";

function genComplexSet(n) {
    let out = [complex.cmx(0, 0)];
    for (let i = 1; i <= n; i++) {
        out.push(complex.cmx(-i * Math.PI, 0));
        out.push(complex.cmx(i * Math.PI, 0));
    }
    return out;
}

function getSineImg(n, iterations, w, h, rangex, rangey) {
    return {
        f: z => z.getSine(),
        df: z => z.getCosine(),
        rangex,
        rangey,
        roots: genComplexSet(n),
        maxIteration: iterations,
        w,
        h,
        tolerance: new Decimal(1e-10)
    }
}

function getPresetOfOrderN(n, w, h, iterations) {
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
        roots.push(complex.polt(1, pi.mul(2 * i).div(n)));
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
    genComplexSet,
    getSineImg,
    getAbsOneFns
}