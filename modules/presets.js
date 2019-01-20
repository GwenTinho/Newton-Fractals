import utils from "./utils";
import complex from "./complex";
import bigfloat from "bigfloat";

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
        tolerance: 1e-10
    }
}

function getAbsOneFns(n, w, h, iterations) {
    let f = z => {
        let a = z.getInstance()
        return a.cexp(n).substract(complex.cmx(1, 0));
    }
    let df = z => {
        let a = z.getInstance()
        return a.cexp(n - 1).multiplyByReal(n);
    }

    let roots = [];

    for (let i = 0; i < n; i++) {
        roots.push(complex.pol(1, 2 * i * (Math.PI / n)));
    }

    return {
        f,
        df,
        w,
        h,
        maxIteration: iterations,
        tolerance: 1e-7,
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