import presets from "../numerical/presets";
import genImageData from "../numerical/genImageData";
import "array-flat-polyfill";

/*
    Helper functions mainly for math or array stuff
*/

function convertRange(value, r1, r2) {
    return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
}

function round(value, digits) {
    return Math.floor(value * 10 ** digits) / 10 ** digits;
}

// returns true if it is an integer else it returns false

function isInt(n) {
    return n === Math.floor(n);
}

//returns true if it is a prime number else it returns false


function isPrime(n) {
    const sqrtnum = Math.floor(Math.sqrt(n));
    let prime = n != 1;
    for (let i = 2; i < sqrtnum + 1; i++) { // sqrtnum + 1
        if (n % i == 0) {
            prime = false;
            break;
        }
    }
    return prime;
}


// finds all factors of an Integer returns them in complementary pairs

function findFactors(n) {
    if (isPrime(n)) return [
        [1, n]
    ];

    const isEven = n % 2 === 0;
    const inc = isEven ? 1 : 2;
    const factors = [
        [1, n]
    ];
    const root = Math.floor(Math.sqrt(n));
    for (let curFactor = isEven ? 2 : 3; curFactor <= root; curFactor += inc) {
        if (n % curFactor !== 0) continue;

        let compliment = n / curFactor;
        factors.push([curFactor, compliment]);
    }

    return factors;
}

function sortDescending(arr) {
    return arr.sort((a, b) => b - a);
}

function sortArr(arr) {
    return arr.sort((a, b) => a - b);
}

function findMinIdx(arr) { // finds the index of the smallest value in array
    if (arr.length === 0) return -1;

    let min = 0;

    for (let i = 1; i < arr.length; i++) {
        if (arr[min] > arr[i]) min = i;
    }

    return min;
}

// finds ScalingPattern and inital Size of 2d array for scaling algorithms used later in genImageData.js

function findScalingPatternAndInitialSize(size, minInitSize, smallestFittingPairList = []) {
    const factors = findFactors(size);

    const factorsAbsDiff = factors.map(pair => Math.abs(pair[1] - pair[0]));

    const smallestFittingPairIdx = findMinIdx(factorsAbsDiff);

    const smallestFittingPair = factors[smallestFittingPairIdx]

    smallestFittingPairList.push(smallestFittingPair);

    if (smallestFittingPair[1] > minInitSize) {
        findScalingPatternAndInitialSize(smallestFittingPair[1], minInitSize, smallestFittingPairList);
    } else if (smallestFittingPair[0] > minInitSize) {
        findScalingPatternAndInitialSize(smallestFittingPair[0], minInitSize, smallestFittingPairList);
    } else {
        console.log(smallestFittingPairList);
        return smallestFittingPairList;
    }

    // figure this out pls thx

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
    fillRange,
    isInt,
    isPrime,
    findDivisors,
    findScalingPatternAndInitialSize
}