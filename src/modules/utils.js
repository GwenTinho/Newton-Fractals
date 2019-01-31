function convertRange(value, r1, r2) {
    return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
}

function newtonsmethod(f) {
    return x => f(x) < 1e-14 ? x : newtonsmethod(f)(x - (f(x) * 1e-10) / (f(x + 1e-10) - f(x)));
}

function newtDiv(digits, div, num) {

    const iterations = Math.ceil(Math.log2((digits + 1) / Math.log2(17)));

    const exp = highestPowerof2(div) * 2;
    div = div / exp;
    num = num / exp;

    let x = 48 / 17 - 32 / 17 * div;

    for (let i = 0; i < iterations; i++) {
        x = x + x * (1 - div * x);
    }

    return num * x;
}

function highestPowerof2(n) {
    if (n < 1) return 0;
    let res = 1;
    for (let i = 0; i < 8; i++) {
        let curr = 1 << i;
        if (curr > n)
            break;
        res = curr;
    }
    return res
}

function getStartToEndTimes(milliseconds) {
    const start = new Date();
    const end = new Date();
    end.setMilliseconds(start.getMilliseconds() + milliseconds);

    return {
        start: algStart.toTimeString().split(" ")[0],
        end: algEnd.toTimeString().split(" ")[0],
    }
}

function round(digits, value) {
    return Math.floor(value * 10 ** digits) / 10 ** digits;
}


export default {
    convertRange,
    newtonsmethod,
    newtDiv,
    getStartToEndTimes,
    round
}