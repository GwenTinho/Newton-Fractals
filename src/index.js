"use strict";

import Fractals from "./modules/metaClasses/fractals";
import Fractal from "./modules/metaClasses/fractal";

let fractals = new Fractals();

for (let i = 0; i < 10; i++) {
    let fractal = new Fractal(2000, i + 3, 0, i % 3);
    fractal.setFileName("fractal" + i + ".jpeg");
    fractal.setA(0.9, 0.05 * i);
    fractal.setIterations(80);
    fractals.add(fractal);

}

fractals.setFilePath("C:/Users/qschr/Desktop/gallery");
fractals.draw();