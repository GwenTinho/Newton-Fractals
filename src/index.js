import express from "express";
import * as presets from "../src/modules/presets";
import genImageData from "../src/modules/genImageData";
import * as utils from "../src/modules/utils";
import {
    performance
} from "perf_hooks";
import fs from "fs";
import path from "path";

const app = express();

app.use(express.static('./src/public'))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/genImageData.json", async (req, res) => {

    try {
        const settings = {
            n: 5,
            w: 15,
            h: 15,
            iterations: 18 // iterations inside of the generator function not related to this one in this scope
        }

        const scaling = 2;
        const steps = 6;
        const boundaries = 5; // increases drawing precision but slows speed dramaticaly

        const iterations = settings.n * settings.w * settings.h * settings.iterations * scaling ** (2 * steps); // iterations per second average out around 3.6k per second => 3600 / 1000
        const expectedTimeInMs = Math.floor(iterations * 1000 / (2 * 3600));
        const expectedTimings = utils.default.getStartToEndTimes(expectedTimeInMs);
        const expectedTimeInHrs = Math.floor(expectedTimeInMs / 3600) / 1000;

        const message = `

        generating a ${settings.w * scaling ** steps} by ${settings.h * scaling ** steps} image ... 
        expected generation time: ${expectedTimeInHrs}h
        started at ${expectedTimings.start}
        expected to end at ${expectedTimings.end}
                
                `;

        console.log(message);

        const promiseStart = performance.now();

        const request = await genImageData.procedualGen(presets.default.getPresetOfOrderN(settings), scaling, steps, boundaries);

        const completingTime = performance.now() - promiseStart;

        const iterationsInThousands = Math.floor(iterations / 1000);
        const completingTimeInSeconds = Math.floor(completingTime / 1000);
        const thousandIterationsPerSecond = utils.default.round(iterations / completingTime, 3);

        console.log(`finished ${iterationsInThousands}k iterations in ${completingTimeInSeconds} seconds (${thousandIterationsPerSecond}k iterations per second)`);

        fs.writeFileSync("image.json", JSON.stringify(request), "utf8");
        return res.json(request);
    } catch (error) {
        console.error(error.message);
    }
});

app.get("/api/image.json", async (req, res, next) => {
    try {
        fs.accessSync("./image.json");
        res.sendFile(path.join(__dirname, "../image.json"));
    } catch (error) {
        console.error(error.message);
    }

});

app.listen(8080, () => console.log("server running on port 8080"));