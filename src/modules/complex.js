import {
    Decimal
} from 'decimal.js';

Decimal.set({
    precision: 24
});

class Complex {
    constructor(obj) {
        if (obj.type === "cartesian") {

            this.real = (typeof obj.val[0] === "number") ? new Decimal(obj.val[0]) : obj.val[0];
            this.imag = (typeof obj.val[1] === "number") ? new Decimal(obj.val[1]) : obj.val[1];

        } else if (obj.type === "polar") {

            this.real = (typeof obj.val[0] === "number") ? new Decimal(obj.val[0]) : obj.val[0];
            this.imag = (typeof obj.val[0] === "number") ? new Decimal(obj.val[0]) : obj.val[0];
            this.real = this.real.mul(Decimal.cos(obj.val[1]));
            this.imag = this.imag.mul(Decimal.sin(obj.val[1]));

        }
    }

    multiplyByReal(x) {
        this.real = this.real.mul(x);
        this.imag = this.imag.mul(x);

        return this;
    }

    getSubstract(z) {
        return cmx(this.real.sub(z.real), this.imag.sub(z.imag))
    }

    getAbs() {
        let a = this.real;
        let b = this.imag;
        return Decimal.sqrt(a.mul(a).add(b.mul(b)));
    }

    getInstance() {
        return cmx(this.real, this.imag);
    }

    getArg() {
        return Decimal.atan2(this.imag, this.real);
    }

    getCexp(n) {
        return pol(Decimal.pow(this.getAbs(), n), this.getArg().mul(n));
    }

    cmultiply(z) {
        let a = this.real;
        let b = this.imag;

        this.real = z.real.mul(a).sub(b.mul(z.imag));
        this.imag = a.mul(z.imag).add(z.real.mul(b));
        return this;
    }

    getAbsSquared() {
        let a = this.real
        let b = this.imag
        return a.mul(a).add(b.mul(b));
    }

    getConj() {
        let zero = new Decimal(0);
        return cmx(this.real, zero.sub(this.imag));
    }



    toString() {
        return `${this.real.toString()}   ${this.imag.toString()}`;
    }
}

function newtStep(f, df, z) { //using complextiny
    const fz = f(z);
    const dfz = df(z);

    const a = dfz.real;
    const b = dfz.imag;
    const absSqr = a.mul(a).add(b.mul(b));

    let result = cmx(0, 0);

    let a1 = fz.real;
    let b1 = fz.imag;
    let c1 = dfz.real;
    let d1 = dfz.imag.mul(-1);

    result.real = c1.mul(a1).sub(b1.mul(d1)).div(absSqr);
    result.imag = a1.mul(d1).add(c1.mul(b1)).div(absSqr);

    return cmx(z.real.sub(result.real), z.imag.sub(result.imag));

}

function getSqrDist(z, w) {
    let a = z.real.sub(w.real);
    let b = z.imag.sub(w.imag);
    return a.mul(a).add(b.mul(b));
}

function cmx(x, y) {
    return new Complex({
        type: "cartesian",
        val: [x, y]
    });
}

function pol(r, a) {
    return new Complex({
        type: "polar",
        val: [r, a]
    });
}

export default {
    pol,
    cmx,
    Complex,
    newtStep,
    getSqrDist
}