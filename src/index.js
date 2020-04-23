"use strict";

import Fractals from "./modules/metaClasses/fractals";
import Fractal from "./modules/metaClasses/fractal";


let fractal = new Fractal(800, 3, 0, 0);
fractal.setFileName("fractal.jpeg");
fractal.setA(1, 0);

fractal.setFilePath("C:/Users/qschr/Desktop/gallery");
fractal.draw();