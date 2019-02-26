import presets from "../numerical/presets";
import genImageData from "../numerical/genImageData";

function convertRange(value, r1, r2) {
    return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
}

function round(value, digits) {
    return Math.floor(value * 10 ** digits) / 10 ** digits;
}

function tenToTheMinus(n) {
    if (n <= 0) return "0";
    if (n <= 15) return Math.pow(10, -n);
    let out = "0.";
    for (let i = 0; i < n - 1; i++) {
        out += "0";
    }
    return out + "1";
}

function generateGalery(settings) {

    const boundaries = 4;

    let galery = [];

    for (let index = 0; index < settings.aValues.length; index++) {
        const presetSettings = {
            w: settings.w,
            h: settings.h,
            n: settings.n,
            a: settings.aValues[index],
            scalingPattern: settings.scalingPattern
        }

        const scalingPattern = settings.scalingPattern;

        const presetDataFN = presets.getPresetOfOrderN(presetSettings);

        const data = genImageData.procedualGen(presetDataFN(), scalingPattern, boundaries).image;

        galery.push(data);
    }


    return {
        galery,
        w: settings.w * settings.scalingPattern.reduce((acc, currV) => acc *= currV),
        h: settings.h * settings.scalingPattern.reduce((acc, currV) => acc *= currV)
    };
}

function fillRange(start, end, step) {
    let out = [];

    const steps = Math.floor((end - start) / step);

    for (let index = 0; index < steps; index++) {
        out.push(start + step * index);
    }

    return out;
}

export default {
    convertRange,
    round,
    tenToTheMinus,
    generateGalery,
    fillRange
}