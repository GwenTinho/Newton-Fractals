"use strict";

import Fractals from "./modules/metaClasses/fractals";
import Fractal from "./modules/metaClasses/fractal";

let fractals = new Fractals();

for (let i = 3; i < 4; i++) {
    let fractal = new Fractal(1600, i + 3, 0, i % 3);
    fractal.setFileName("fractal" + i + ".jpeg");
    fractal.setA(0.9, 0.3 * i);
    fractal.setIterations(600);
    fractals.add(fractal);

}

fractals.setFilePath("your path");
fractals.draw();
