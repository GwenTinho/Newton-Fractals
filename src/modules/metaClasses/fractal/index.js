"use strict";
import draw from "../../draw";
import task from "../../misc/task";
import utils from "../../misc/utils";
import Complex from "complex.js";

/*
    Generates a square fractal 
    @param size: Size of the image in px(number is used to determine an appropriate scaling pattern size of actual picture might just be an approximation for poorly chosen sizes)(if prime or non integer defaults to value) //default value : 2000
    @param isGif: Says if it 's supposed to draw an image or an array of images (a gif) (if non boolean default to value) //default value : false
    @param presetIndex: index of the preset for the fractal to be used(if number > 1 defaults to value) //default value : 0
    @param coloringAlgIndex: index of the coloring algorithm to be used(if number > 2 defaults to value) //default value : 0
    @param n: exponent of the function used for the fractal if it is of the form z^n - 1(if non int defaults to value) //default value : 3
*/

class Fractal {
    constructor(size = 2000, n = 3, presetIndex = 0, coloringAlgIndex = 0, isGif = false) { // turn everything except size and n into an object called options
        this.isGif = (typeof isGif === "boolean") ? isGif : false;
        this.size = ((typeof size === "number") && !utils.isPrime(size) && utils.isInt(size)) ? size : 2000; // check if it is a number and an int and non prime
        this.n = ((typeof n === "number") && utils.isInt(n)) ? n : 3; // assumes n as an integer
        this.presetIndex = presetIndex;
        this.coloringAlgIndex = coloringAlgIndex;
        this.filePath = "not set yet"; // file path for gif or jpeg to be sent to
        this.fileName = "fractal.jpeg"
        // internal variables used for drawing

        /*
            initSize: size of the 2d array before being scaled up to size  (set to 40 by default)
            scalingPattern: Path taken to get to said size
            a: used for rotation see wikipedia page for newton fractals
        */

        let patternAndInitSize = utils.findScalingPatternAndInitialSize(this.size, 40, 20);

        this.scalingPattern = patternAndInitSize.scalingPattern;
        this.initSize = patternAndInitSize.initSize;
        this.a = new Complex({
            re: 1,
            im: 0
        });
    }

    setFilePath(filePath) { // sets the filepath where the image will be saved
        this.filePath = filePath;
    }

    setFileName(fileName) { // filename has to include .jpeg
        this.fileName = fileName;
    }

    setA(real = 1, imag = 0) {
        this.a = new Complex({
            re: real,
            im: imag
        });
    }

    setIterations(iterations = 0) { // see task.js getStatistics for more
        this.iterations = iterations;
    }


    draw() { // generates the actual image

        if (this.isGif) { // add filepath thingy

            console.log("not yet implemented");

            return "not yet";

            let settings = "..." // finish this not making gifs atm revisit this later

            generateAndDrawGalery(settings);

        } else { // add filepath thingy
            const settings = {
                w: this.initSize,
                h: this.initSize,
                scalingPattern: this.scalingPattern,
                n: this.n,
                a: this.a, // "a" is a parameter that is a number for special scaling view wikipedia (for gifs its an array)
                presetIndex: this.presetIndex,
                iterations: this.iterations
            };

            // see getStatistics in /misc/task

            const data = task.getStatistics(settings);
            draw.drawJPEG(data, this.coloringAlgIndex, this.filePath, this.fileName);
        }
    }
}

export default Fractal