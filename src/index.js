import utils from "../src/modules/utils";
import drawJPEG from "./modules/draw";
import complex from "./modules/complex";

////settings

const settings = {
    n: 10,
    w: 50,
    h: 50,
    scalingPattern: [5, 4, 2] // 9 hrs
}

drawJPEG(utils.getStatistics(settings));