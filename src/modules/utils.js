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
        start: start.toTimeString().split(" ")[0],
        end: end.toTimeString().split(" ")[0],
    }
}

function round(value, digits) {
    return Math.floor(value * 10 ** digits) / 10 ** digits;
}

function tenToTheMinus(n) {
    if (n <= 0) return "0";
    let out = "0.";
    for (let i = 0; i < n - 1; i++) {
        out += "0";
    }
    return out + "1";
}

function getTaskInfos(settings, scalingPattern) {
    const iterationScalingFactor = scalingPattern.reduce((acc, currV) => acc *= currV);
    const iterations = settings.n * settings.w * settings.h * settings.iterations * iterationScalingFactor ** 2; // iterations per second average out around 3.6k per second => 3600 / 1000
    const expectedTimeInMs = Math.floor(iterations * 1000 / (2 * 3600));
    const expectedTimings = getStartToEndTimes(expectedTimeInMs);
    const expectedTimeInHrs = Math.floor(expectedTimeInMs / 3600) / 1000;
    const imageWidth = settings.w * iterationScalingFactor;
    const imageHeight = settings.h * iterationScalingFactor;
    const message = `
    
    generating a ${imageWidth} by ${imageHeight} image ... 
    expected generation time: ${expectedTimeInHrs}h
    started at ${expectedTimings.start}
    expected to end at ${expectedTimings.end}
                    
                    `;

    return {
        message,
        iterations
    };
}

function getPromiseInfos(completingTime, iterations) {
    const iterationsInThousands = Math.floor(iterations / 1000);
    const completingTimeInSeconds = Math.floor(completingTime / 1000);
    const thousandIterationsPerSecond = round(iterations / completingTime, 3);

    return {
        message: `finished ${iterationsInThousands}k iterations in ${completingTimeInSeconds} seconds (${thousandIterationsPerSecond}k iterations per second)`
    };
}

export default {
    convertRange,
    newtonsmethod,
    newtDiv,
    getStartToEndTimes,
    round,
    tenToTheMinus,
    getTaskInfos,
    getPromiseInfos
}