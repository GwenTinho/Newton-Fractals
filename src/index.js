"use strict";

import utils from "./modules/misc/utils";
import draw from "./modules/draw";
import settings from "./config.json";
import generateAndDrawGalery from "./modules/drawMemoryEfficiently";

settings.aValues = utils.fillRange(0, 0.5, 0.005).map(val => {
    return {
        real: 1,
        imag: val
    }
});

generateAndDrawGalery(settings);