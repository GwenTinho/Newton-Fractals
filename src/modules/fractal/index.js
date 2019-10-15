"use strict";
import {
    drawJPEG
} from "../draw";
import {
    getStatistics
} from "../misc/task";

/*
    Generates a square fractal 
    @param size: Size of the image in px(number is used to determine an appropriate scaling pattern size of actual picture might just be an approximation for poorly chosen sizes)(if prime or non integer defaults to value) //default value : 100
    @param isGif: Says if it 's supposed to draw an image or an array of images (a gif) (if non boolean default to value) //default value : false
    @param presetIndex: index of the preset for the fractal to be used(if number > 1 defaults to value) //default value : 0
    @param coloringAlgIndex: index of the coloring algorithm to be used(if number > 2 defaults to value) //default value : 0
    @param n: exponent of the function used for the fractal if it is of the form z^n - 1(if non int defaults to value) //default value : 3
*/

class Fractal {
    constructor(isGif = false, size = 100, presetIndex = 0, coloringAlgIndex = 0, n = 3) {
        this.isGif = (typeof isGif === "boolean") ? isGif : false;
        this.size = ((typeof size === "number") && isPrime(size) && isInt(size)) ? size : 100; // check if it is a number and an int and non prime
        this.n = ((typeof n === "number") && isInt(n)) ? n : 3; // assumes n as an integer
        this.presetIndex = presetIndex;
        this.coloringAlgIndex = coloringAlgIndex;
        this.filePath = "sample filePath" // file path for gif or jpeg to be sent to

        // internal variables used for drawing

        /*
            initSize: size of the 2d array before being scaled up to size 
            scalingPattern: Path taken to get to said size
        */


    }

    setPath(filePath) { // sets the filepath where the image will be saved
        this.filePath = filePath;
    }

    draw() { // generates the actual image
        if (this.isGif) { // add filepath thingy
            let settings = "..." // finish this

            generateAndDrawGalery(settings);
        } else { // add filepath thingy
            const settings = {
                w: this.initSize,
                h: this.initSize,
                scalingPattern: this.scalingPattern,
                n: this.n,
                a: "not used for images", // "a" is a parameter that would be needed if we were dealing with a gif
                presetIndex: this.presetIndex
            };
            const data = getStatistics(settings); // see getStatistics in /misc/task
            drawJPEG(data, this.coloringAlgIndex);
        }
    }
}