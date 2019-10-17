import {
    performance
} from "perf_hooks";
import utils from "../misc/utils";
import presets from "../numerical/presets";
import genImageData from "../numerical/genImageData";
/*
    Collection of functions mainly used to measure things related to performance
*/

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

function getStartToEndTimes(milliseconds) {
    const start = new Date();
    const end = new Date();
    end.setMilliseconds(start.getMilliseconds() + milliseconds);

    return {
        start: start.toTimeString().split(" ")[0],
        end: end.toTimeString().split(" ")[0],
    }
}


function getDataInfos(completingTime, iterations) {
    const iterationsInThousands = Math.floor(iterations / 1000);
    const completingTimeInSeconds = Math.floor(completingTime / 1000);
    const thousandIterationsPerSecond = utils.round(iterations / completingTime, 3);

    return {
        message: `finished ${iterationsInThousands}k iterations in ${completingTimeInSeconds} seconds (${thousandIterationsPerSecond}k iterations per second)`
    };
}

function getFunctionRuntime(fn, params) {
    const promiseStart = performance.now();

    const data = fn(...params);

    const completingTime = performance.now() - promiseStart;

    return {
        data,
        completingTime
    }
}

function getStatistics(settings) { // does a lot of things for you such as getting presets and such and then returns the data from the algorithm
    const presetSettings = {
        w: settings.w,
        h: settings.h,
        n: settings.n, // n describes the exponent if the the function used for the fractal is of the z^n - 1
        iterations: 40,
        a: settings.a,
        scalingPattern: settings.scalingPattern
    }
    const boundaries = 4;
    const scalingPattern = settings.scalingPattern;

    const taskInfos = getTaskInfos(presetSettings, scalingPattern);

    console.log(taskInfos.message);

    const presetKey = Object.keys(presets)[settings.presetIndex];

    const presetDataFN = presets[presetKey](presetSettings);

    const {
        data,
        completingTime
    } = getFunctionRuntime(genImageData.procedualGen, // runs genImageData with all the required settings
        [presetDataFN(), scalingPattern, boundaries]
    );

    const promiseInfos = getDataInfos(completingTime, taskInfos.iterations);

    console.log(promiseInfos.message);

    return data;
}

export default {
    getStatistics,
    getStartToEndTimes,
    getDataInfos,
    getFunctionRuntime,
    getTaskInfos
}