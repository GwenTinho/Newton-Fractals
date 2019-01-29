import {
    Decimal
} from 'decimal.js';

class Complex {
    constructor(obj) {
        if (obj.type === "cartesian") {
            if (obj.val.length === 2) {
                this.real = (typeof obj.val[0] === "number") ? new Decimal(obj.val[0]) : obj.val[0];
                this.imag = (typeof obj.val[1] === "number") ? new Decimal(obj.val[1]) : obj.val[1];
            }
        } else if (obj.type === "polar") {
            if (obj.val.length === 2) {
                this.real = (typeof obj.val[0] === "number") ? new Decimal(obj.val[0]) : obj.val[0];
                this.imag = (typeof obj.val[0] === "number") ? new Decimal(obj.val[0]) : obj.val[0];
                this.real = this.real.mul(Decimal.cos(obj.val[1]));
                this.imag = this.imag.mul(Decimal.sin(obj.val[1]));
            }
        }
    }

    addition(z) {
        this.real = this.real.add(z.real);
        this.imag = this.imag.add(z.imag);

        return this;
    }

    substract(z) {
        this.real = this.real.sub(z.real);
        this.imag = this.imag.sub(z.imag);

        return this;
    }

    cmultiply(z) {
        let a = this.real;
        let b = this.imag;

        this.real = z.real.mul(a).sub(b.mul(z.imag));
        this.imag = a.mul(z.imag).add(z.real.mul(b));
        return this;
    }

    getConj() {
        let zero = new Decimal(0);
        return cmx(this.real, zero.sub(this.imag));
    }

    getAbs() {
        return Decimal.sqrt(Decimal.pow(this.real, 2).add(Decimal.pow(this.imag, 2)));
    }

    getAbsSquared() {
        return Decimal.pow(this.real, 2).add(Decimal.pow(this.imag, 2));
    }

    getArg() {
        return Decimal.atan2(this.imag, this.real);
    }

    multiplyByReal(x) {
        this.real = this.real.mul(x);
        this.imag = this.imag.mul(x);

        return this;
    }


    divideByReal(x) {
        this.real = this.real.div(x);
        this.imag = this.imag.div(x);

        return this;
    }

    divide(z) {
        this.cmultiply(z.getConj());
        this.divideByReal(z.getAbsSquared());
        return this;
    }

    getSubstract(z) {
        return cmx(this.real.sub(z.real), this.imag.sub(z.imag))
    }

    square() {
        const a = this.real;
        const b = this.imag;

        this.real = Decimal.pow(this.real, 2).sub(Decimal.pow(this.imag, 2));
        this.imag = a.mul(b).mul(2);
        return this;
    }

    getSquare() {
        const a = this.real;
        const b = this.imag;

        return cmx(Decimal.pow(this.real, 2).sub(Decimal.pow(this.imag, 2)), a.mul(b).mul(2));
    }

    getInstance() {
        return cmx(this.real, this.imag);
    }

    // getComplexDerivative(f) {
    //     let a = this.getInstance();
    //     let z = new Complex({
    //         type: "polar",
    //         val: [a.getAbs() - 1e-8, a.getArg()]
    //     });
    //     return f(z).substract(f(a)).divide(z.substract(a));
    // }

    cexp(n) {
        let w = pol(Decimal.pow(this.getAbs(), n), this.getArg().mul(n));

        this.real = w.real;
        this.imag = w.imag;

        return this;
    }

    getFunction(f) {
        return f(this.getInstance());
    }

    getSine() {
        return cmx(Decimal.sin(this.real) * Decimal.cosh(this.imag), Decimal.sinh(this.imag) * Decimal.cos(this.real));
    }

    getCosine() {
        let zero = new Decimal(0);
        return cmx(Decimal.cos(this.real).mul(Decimal.cosh(this.imag)), zero.sub(Decimal.sinh(this.imag).mul(Decimal.sin(this.real))));
    }

    newtStep(f, df, z) {
        const fz = f(z);
        const dfz = df(z);

        const absSqr = fz.real.mul(fz.real).add(fz.imag.mul(fz.imag));

        let result = fz.cmultiply(dfz.getConj());

        result.real = result.real.div(absSqr);
        result.imag = result.imag.div(absSqr);


        this.real = this.real.sub(result.real);
        this.imag = this.imag.sub(result.imag);


        //return this;
    }

    toString() {
        return `${this.real.toString()}   ${this.imag.toString()}`;
    }
}

class ComplexTiny {
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
        return cmxt(this.real.sub(z.real), this.imag.sub(z.imag))
    }

    getAbs() {
        let a = this.real;
        let b = this.imag;
        return Decimal.sqrt(a.mul(a).add(b.mul(b)));
    }

    getInstance() {
        return cmxt(this.real, this.imag);
    }

    getArg() {
        return Decimal.atan2(this.imag, this.real);
    }

    getCexp(n) {
        return polt(Decimal.pow(this.getAbs(), n), this.getArg().mul(n));
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
        return cmxt(this.real, zero.sub(this.imag));
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

    let result = cmxt(0, 0);

    let a1 = fz.real;
    let b1 = fz.imag;
    let c1 = dfz.real;
    let d1 = dfz.imag.mul(-1);

    result.real = c1.mul(a1).sub(b1.mul(d1)).div(absSqr);
    result.imag = a1.mul(d1).add(c1.mul(b1)).div(absSqr);

    return cmxt(z.real.sub(result.real), z.imag.sub(result.imag));

}

function getDist(z, w) {
    let a = z.real.sub(w.real);
    let b = z.imag.sub(w.imag);
    return a.mul(a).add(b.mul(b));
}

function cmxt(x, y) {
    return new ComplexTiny({
        type: "cartesian",
        val: [x, y]
    });
}

function polt(r, a) {
    return new ComplexTiny({
        type: "polar",
        val: [r, a]
    });
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
    ComplexTiny,
    cmxt,
    polt,
    newtStep,
    getDist
}