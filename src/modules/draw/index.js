import {
    createCanvas
} from "canvas";
import {
    drawDot
} from "./draw";
import colors from "./colors";
import path from "path";
import fs from "fs";

function drawCanvas(imageData) {
    const [image, rootlength, w, h, maxIteration] = [imageData.image, imageData.rootlength, imageData.w, imageData.h, imageData.maxIteration];

    const canvas = createCanvas(w, h);
    const ctx = canvas.getContext("2d");

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            if (image[y][x][0] !== -1) drawDot(x, y, image[y][x], colors.mapSmoothColour(rootlength), ctx);
            else drawDot(x, y, 0, colors.black, ctx);
        }
    }
    return canvas;
}

function drawJPEG(data) {
    const image = drawCanvas(data);

    const out = fs.createWriteStream(path.join(__dirname, "/../../../recent images", "/fractal.jpeg"));
    const stream = image.createJPEGStream({
        quality: 0.95,
        chromaSubsampling: false
    });

    stream.pipe(out);
    out.on('finish', () => console.log('The JPEG file was created.'));
}

export default drawJPEG;