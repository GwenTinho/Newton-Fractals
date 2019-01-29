import express from "express";
import * as presets from "./modules/presets";
import genImageData from "./modules/genImageData";
import * as utils from "./modules/utils";
import {
    performance
} from "perf_hooks";
import fs from "fs";

const app = express();

app.use(express.static('public'))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/genImageData.json", async (req, res) => {

    try {
        const n = 3,
            w = 100,
            h = 100,
            maxit = 10;
        console.log("generating image ...");
        let start = performance.now();
        let request = await genImageData.gen(presets.default.getAbsOneFns(n, w, h, maxit));
        let completingTime = performance.now() - start;
        console.log(`finished ${Math.floor(n * w * h * maxit / 1000)}k iterations in ${Math.floor(completingTime / 1000)} seconds (${Math.floor(n * w * h * maxit * 100 / completingTime) / 100}k iterations per second)`);

        fs.writeFileSync("image.json", JSON.stringify(request), "utf8");
        return res.json(request);
    } catch (error) {
        console.error(error.message);
    }
});

app.listen(8080, () => console.log("server running on port 8080"));