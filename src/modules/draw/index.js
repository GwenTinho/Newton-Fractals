import {
    createCanvas
} from "canvas";
import {
    drawDot
} from "./draw";
import colorsAlgs from "./coloralgs";
import simpleColors from "./simplecolors";
import path from "path";
import fs from "fs";
import GIFEncoder from "gifencoder";

function drawCanvas(imageData, colorAlgIndex) { // use image data from functions defined in genimagedata
    const [image, w, h] = [imageData.image, imageData.w, imageData.h];

    const canvas = createCanvas(w, h);
    const ctx = canvas.getContext("2d");
    const colorFN = colorsAlgs[Object.keys(colorsAlgs)[colorAlgIndex]]();


    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            if (image[y][x].iteration !== -1) drawDot(x, y, image[y][x], colorFN, ctx); // rn theres mapColour and mapSmoothColor & mapcrazycolor idea of generating galeries
            else drawDot(x, y, 0, simpleColors.black, ctx);
        }
    }

    return {
        canvas,
        ctx
    };
}

function drawJPEG(data, colorAlgIndex) {
    const image = drawCanvas(data, colorAlgIndex).canvas;

    const out = fs.createWriteStream(path.join(__dirname, "/../../../recent images", "/fractal.jpeg"));
    const stream = image.createJPEGStream({
        quality: 0.95,
        chromaSubsampling: false
    });

    stream.pipe(out);
    out.on('finish', () => console.log('The JPEG file was created.'));
}

function drawGifFromGalery(galeryData) {

    const encoder = new GIFEncoder(galeryData.w, galeryData.h);
    // stream the results as they are available into myanimated.gif
    encoder.createReadStream().pipe(fs.createWriteStream(path.join(__dirname, "/../../../../recent images", "/fractal.gif")));

    encoder.start();
    encoder.setRepeat(0); // 0 for repeat, -1 for no-repeat
    encoder.setDelay(10); // frame delay in ms
    encoder.setQuality(10); // image quality. 10 is default.


    const galery = galeryData.galery;

    for (let index = 0; index < galery.length; index++) {
        let frame = drawCanvas({
            image: galery[index],
            w: galeryData.w,
            h: galeryData.h
        }).ctx;

        encoder.addFrame(frame);

        galery[index] = null;
    }

    encoder.finish();
    console.log("The GIF file was created.");
}


export default {
    drawJPEG,
    drawGifFromGalery,
    drawCanvas
};