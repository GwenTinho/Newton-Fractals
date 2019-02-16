"use strict";

import {
    Decimal
} from "decimal.js";

class Vanilla {
    constructor(number) {
        this.number = number;
    }

    mul(number) {
        return Vanilla.instance(Vanilla.checkAndReturn(number) * this.number);
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
        return Vanilla.instance(Math.sqrt(Vanilla.checkAndReturn(number)));
    }

    static cos(number) {
        return Vanilla.instance(Math.cos(Vanilla.checkAndReturn(number)));
    }

    static sin(number) {
        return Vanilla.instance(Math.sin(Vanilla.checkAndReturn(number)));
    }

    static atan2(y, x) {
        return Vanilla.instance(Math.atan2(Vanilla.checkAndReturn(y), Vanilla.checkAndReturn(x)));
    }

    static pow(base, exponent) {
        return Vanilla.instance(Math.pow(Vanilla.checkAndReturn(base), Vanilla.checkAndReturn(exponent)));
    }

    static acos(number) {
        return Vanilla.instance(Math.acos(Vanilla.checkAndReturn(number)));
    }

    static instance(number) {
        return new Vanilla(number);
    }

    static checkAndReturn(number) {
        if (typeof number === "number") return number;
        if (typeof number.number === "number") return number.number;
    }

    static log(number) {
        return Vanilla.instance(Math.log(Vanilla.checkAndReturn(number)));
    }

    static isVanilla() {
        return true;
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