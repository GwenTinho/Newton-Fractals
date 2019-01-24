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

    toString() {
        return `${this.real.toString()}   ${this.imag.toString()}`;
    }
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
    Complex
}