"use strict";

import Fractals from "./modules/metaClasses/fractals";
import Fractal from "./modules/metaClasses/fractal";

let fractals = new Fractals();

for (let i = 0; i < 4; i++) {
    let fractal = new Fractal(1600, i + 3.5, 0, i % 3);
    fractal.setFileName("fractal" + i + ".jpeg");
    fractal.setA(0.9, 0.3 * i);
    fractal.setIterations(600);
    fractals.add(fractal);

}

fractals.setFilePath("C:/Users/qschr/Desktop/gallery");
fractals.draw();