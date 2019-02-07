import presets from "../src/modules/presets";
import genImageData from "../src/modules/genImageData";
import utils from "../src/modules/utils";
import {
    performance
} from "perf_hooks";
import fs from "fs";
import path from "path";
import draw from "./modules/draw";

(async () => {
    try {


        ////settings

        const settings = {
            n: 3,
            w: 30,
            h: 30,
            iterations: 40 // iterations inside of the generator function not related to this one in this scope
        }
        const scalingPattern = [4, 3, 3];
        const boundaries = 4; // increases drawing precision but slows speed dramaticaly

        ////


        //// expected times etc
        const taskInfos = utils.getTaskInfos(settings, scalingPattern);

        console.log(taskInfos.message);

        ////

        //// generate imageData

        const promiseStart = performance.now();

        const request = await genImageData.procedualGen(presets.getPresetOfOrderN(settings), scalingPattern, boundaries);

        const completingTime = performance.now() - promiseStart;

        const promiseInfos = utils.getPromiseInfos(completingTime, taskInfos.iterations);

        console.log(promiseInfos.message);

        ////

        //// generate jpeg

        const image = draw(request);

        const out = fs.createWriteStream(path.join(__dirname, "/../recent images", "/fractal.jpeg"));
        const stream = image.createJPEGStream({
            quality: 0.95,
            chromaSubsampling: false
        });

        stream.pipe(out);
        out.on('finish', () => console.log('The JPEG file was created.'));

        ////

    } catch (error) {
        console.error(error.message);
    }
})();