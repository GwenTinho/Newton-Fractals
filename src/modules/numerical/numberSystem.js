"use strict";

import {
    Decimal
} from "decimal.js";

class Vanilla {
    constructor(number) {
        this.number = number;
    }

    mul(number) {
        return Vanilla.instance(Vanilla.checkAndReturn(number) * this.number); // this === instance of Vanilla // this.__proto__.constructor ==== Vanilla
    }

    sub(number) {
        return Vanilla.instance(this.number - Vanilla.checkAndReturn(number));
    }

    add(number) {
        return Vanilla.instance(this.number + Vanilla.checkAndReturn(number));
    }

    div(number) {
        return Vanilla.instance(this.number / Vanilla.checkAndReturn(number));
    }

    lt(number) {
        return this.number < Vanilla.checkAndReturn(number);
    }

    toString() {
        return "" + this.number;
    }

    static sqrt(number) {
        return this.instance(Math.sqrt(this.checkAndReturn(number))); // here this ==== Vanilla
    }

    static cos(number) {
        return this.instance(Math.cos(this.checkAndReturn(number)));
    }

    static sin(number) {
        return this.instance(Math.sin(this.checkAndReturn(number)));
    }

    static cosh(number) {
        return this.instance(Math.cosh(this.checkAndReturn(number)));
    }

    static sinh(number) {
        return this.instance(Math.sinh(this.checkAndReturn(number)));
    }

    static atan2(y, x) {
        return this.instance(Math.atan2(this.checkAndReturn(y), this.checkAndReturn(x)));
    }

    static pow(base, exponent) {
        return this.instance(Math.pow(this.checkAndReturn(base), this.checkAndReturn(exponent)));
    }

    static acos(number) {
        return this.instance(Math.acos(this.checkAndReturn(number)));
    }

    static instance(number) {
        return new this(number);
    }

    static checkAndReturn(number) {
        if (typeof number === "number") return number;
        if (typeof number.number === "number") return number.number;
    }

    static ln(number) {
        return this.instance(Math.log(this.checkAndReturn(number)));
    }

    static isVanilla() {
        return true;
    }

    static exp(number) {
        return this.instance(Math.exp(this.checkAndReturn(number)));
    }
}

function numberSysFactory(settings) { // type: string (vanilla or bigFloat), if bigfloat precision : int
    if (settings.type === "bigFloat") {
        Decimal.set({
            precision: settings.precision
        });

        return Decimal;
    }
    if (settings.type === "vanilla") {
        return Vanilla;
    }
}

let NumberSystem = numberSysFactory({
    type: "vanilla",
    //precision: 24
});

export default NumberSystem;