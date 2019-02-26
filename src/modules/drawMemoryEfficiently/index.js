import genImageData from "../numerical/genImageData";
import path from "path";
import fs from "fs";
import GIFEncoder from "gifencoder";
import draw from "../draw";
import presets from "../numerical/presets";

function generateAndDrawGalery(settings) {

    const scalingTotal = settings.scalingPattern.reduce((acc, currV) => acc *= currV);

    const encoder = new GIFEncoder(settings.w * scalingTotal, settings.h * scalingTotal);
    // stream the results as they are available into fractal.gif
    encoder.createReadStream().pipe(fs.createWriteStream(path.join(__dirname, "/../../../../recent images", "/fractal.gif")));

    encoder.start();
    encoder.setRepeat(0); // 0 for repeat, -1 for no-repeat
    encoder.setDelay(10); // frame delay in ms
    encoder.setQuality(10); // image quality. 10 is default.

    const boundaries = 4;


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

        const data = genImageData.procedualGen(presetDataFN(), scalingPattern, boundaries);

        let frame = draw.drawCanvas(data).ctx;

        encoder.addFrame(frame);

        console.log(Math.floor(index * 10000 / settings.aValues.length) / 100 + "%");
    }

    encoder.finish();
    console.log("The GIF file was created.");
}

function toVideo(settings) {
    const scalingTotal = settings.scalingPattern.reduce((acc, currV) => acc *= currV);

    // init video encoder

    const boundaries = 4;


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

        const data = genImageData.procedualGen(presetDataFN(), scalingPattern, boundaries);

        let frame = draw.drawCanvas(data).canvas.toBuffer("raw");

        // add frame to video using some lib

        console.log(Math.floor(index * 10000 / settings.aValues.length) / 100 + "%");
    }

    // finish video creation
    console.log("The MP4 file was created.");
}

export default generateAndDrawGalery;