"use strict";

import utils from "../src/modules/utils";
import drawJPEG from "./modules/draw";

////settings

const settings = {
    n: 5,
    w: 50,
    h: 50,
    scalingPattern: [8]
}

drawJPEG(utils.getStatistics(settings));