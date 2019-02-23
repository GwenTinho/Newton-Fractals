"use strict";

import utils from "./modules/misc/utils";
import drawJPEG from "./modules/draw";
import settings from "./config.json";
import complex from "./modules/numerical/complex";


console.log(complex.cmx(0, 1).getZToTheIthPower(complex.cmx(0, 1)));
console.log(complex.cpow(complex.cmx(0, 1), complex.cmx(0, 1)));

drawJPEG(utils.getStatistics(settings));