import NumberSystem from "./numberSystem";


class Complex {
    constructor(obj) {
        if (obj.type === "cartesian") {

            this.real = (typeof obj.val[0] === "number") ? new NumberSystem(obj.val[0]) : obj.val[0];
            this.imag = (typeof obj.val[1] === "number") ? new NumberSystem(obj.val[1]) : obj.val[1];

        } else if (obj.type === "polar") {

            this.real = (typeof obj.val[0] === "number") ? new NumberSystem(obj.val[0]) : obj.val[0];
            this.imag = (typeof obj.val[0] === "number") ? new NumberSystem(obj.val[0]) : obj.val[0];
            this.real = this.real.mul(NumberSystem.cos(obj.val[1]));
            this.imag = this.imag.mul(NumberSystem.sin(obj.val[1]));
        }
    }

    multiplyByReal(x) {
        this.real = this.real.mul(x);
        this.imag = this.imag.mul(x);

        return this;
    }

    getSubstract(z) {
        return Complex.cmx(this.real.sub(z.real), this.imag.sub(z.imag));
    }

    getAddition(z) {
        return Complex.cmx(this.real.add(z.real), this.imag.add(z.imag));
    }


    getAbs() {
        let a = this.real;
        let b = this.imag;
        return NumberSystem.sqrt(a.mul(a).add(b.mul(b)));
    }

    getInstance() {
        return Complex.cmx(this.real, this.imag);
    }

    getArg() {
        return NumberSystem.atan2(this.imag, this.real);
    }

    getCexp(n) {
        return Complex.pol(NumberSystem.pow(this.getAbs(), n), this.getArg().mul(n));
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
        let zero = new NumberSystem(0);
        return Complex.cmx(this.real, zero.sub(this.imag));
    }

    divByReal(x) {
        this.real = this.real.div(x);
        this.imag = this.imag.div(x);

        return this;
    }

    toString() {
        return `${this.real.toString()}   ${this.imag.toString()}`;
    }

    static newtStep(f, df, z) { //using complextiny
        const fz = f(z);
        const dfz = df(z);

        const a = dfz.real;
        const b = dfz.imag;
        const absSqr = a.mul(a).add(b.mul(b));

        let result = Complex.cmx(0, 0);

        let a1 = fz.real;
        let b1 = fz.imag;
        let c1 = dfz.real;
        let d1 = dfz.imag.mul(-1);

        result.real = c1.mul(a1).sub(b1.mul(d1)).div(absSqr);
        result.imag = a1.mul(d1).add(c1.mul(b1)).div(absSqr);

        return Complex.cmx(z.real.sub(result.real), z.imag.sub(result.imag));
    }

    static getSqrDist(z, w) {
        let a = z.real.sub(w.real);
        let b = z.imag.sub(w.imag);
        return a.mul(a).add(b.mul(b));
    }

    static cmx(x, y) {
        return new Complex({
            type: "cartesian",
            val: [x, y]
        });
    }

    static pol(r, a) {
        return new Complex({
            type: "polar",
            val: [r, a]
        });
    }

    static sin(z) {
        const real = NumberSystem.sin(z.real).mul(NumberSystem.cosh(z.imag));
        const imag = NumberSystem.cos(z.real).mul(NumberSystem.sinh(z.imag));
        return Complex.cmx(real, imag);
    }

    static cos(z) {
        const real = NumberSystem.cos(z.real).mul(NumberSystem.cosh(z.imag));
        const imag = NumberSystem.sin(z.real).mul(NumberSystem.sinh(z.imag));
        return Complex.cmx(real, imag);
    }

    static tan(z) {
        const divisor = NumberSystem.cos(z.real.mul(2)).add(NumberSystem.cosh(z.imag.mul(2)));
        const real = NumberSystem.sin(z.real.mul(2)).div(divisor);
        const imag = NumberSystem.sinh(z.imag.mul(2)).div(divisor);
        return Complex.cmx(real, imag);
    }
}

export default Complex