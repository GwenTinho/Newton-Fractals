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
        const n = 3,
            w = 50,
            h = 50,
            maxit = 10;

        const iterations = n * w * h * maxit;
        const algStart = new Date();
        const algEnd = new Date();
        algEnd.setMilliseconds(algStart.getMilliseconds() + Math.floor(iterations * 1000 / 3600));
        console.log(`generating image ... \nexpected generation time: ${Math.floor(1000 * iterations/(3600 ** 2)) / 1000}h\nstarted at ${algStart.toTimeString().split(" ")[0]}\nexpected to end at ${algEnd.toTimeString().split(" ")[0]}`);
        let start = performance.now();
        let request = await genImageData.gen(presets.default.getAbsOneFns(n, w, h, maxit));
        let completingTime = performance.now() - start;
        console.log(`finished ${Math.floor(iterations / 1000)}k iterations in ${Math.floor(completingTime / 1000)} seconds (${Math.floor(iterations * 100 / completingTime) / 100}k iterations per second)`);

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