class Complex { // my own version of a complex number implementation as the others didnt quite do the trick, I will have to optimize it though.
    constructor(obj) {
        if (obj.type === "cartesian") {
            if (obj.val.length === 2) {
                if (typeof obj.val[0] === "number") this.real = obj.val[0];
                if (typeof obj.val[0] === "number") this.imag = obj.val[1];
            }
        } else if (obj.type === "polar") {
            if (obj.val.length === 2) {
                if (typeof obj.val[0] === "number") this.real = obj.val[0] * Math.cos(obj.val[1]);
                if (typeof obj.val[0] === "number") this.imag = obj.val[0] * Math.sin(obj.val[1]);
            }
        }
    }

    addition(z) {
        this.real += z.real;
        this.imag += z.imag;
        return this;
    }

    substract(z) {
        this.real -= z.real;
        this.imag -= z.imag;
        return this;
    }

    cmultiply(z) {
        let a = this.real;
        let b = this.imag;

        this.real = z.real * a - b * z.imag;
        this.imag = a * z.imag + z.real * b;
        return this;
    }

    getConj() {
        return cmx(this.real, -this.imag);
    }

    getAbs() {
        return Math.sqrt(this.real ** 2 + this.imag ** 2);
    }

    getAbsSquared() {
        return this.real ** 2 + this.imag ** 2
    }

    getArg() {
        return Math.atan2(this.imag, this.real);
    }

    multiplyByReal(x) {
        this.real *= x;
        this.imag *= x;

        return this;
    }

    divideByReal(x) {
        this.real /= x;
        this.imag /= x;

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

        this.real = a ** 2 - b ** 2;
        this.imag = 2 * a * b;
        return this;
    }

    getSquare() {
        const a = this.real;
        const b = this.imag;

        return cmx(a ** 2 - b ** 2, 2 * a * b);
    }

    getInstance() {
        return cmx(this.real, this.imag);
    }

    getComplexDerivative(f) {
        let a = this.getInstance();
        let z = new Complex({
            type: "polar",
            val: [a.getAbs() - 1e-8, a.getArg()]
        });
        return f(z).substract(f(a)).divide(z.substract(a));
    }

    cexp(n) {
        let w = new Complex({
            type: "polar",
            val: [this.getAbs() ** n, this.getArg() * n]
        });

        this.real = w.real;
        this.imag = w.imag;

        return this;
    }

    getFunction(f) {
        return f(this.getInstance());
    }

    getSine() {
        return cmx(Math.sin(this.real) * Math.cosh(this.imag), Math.sinh(this.imag) * Math.cos(this.real));
    }

    getCosine() {
        return cmx(Math.cos(this.real) * Math.cosh(this.imag), -Math.sinh(this.imag) * Math.sin(this.real));
    }
}

function cdiv(z, w) {
    return z.getInstance().divide(w);
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