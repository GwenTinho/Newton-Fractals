import utils from "../src/modules/utils";
import drawJPEG from "./modules/draw";

////settings

const settings = {
    n: 3,
    w: 10,
    h: 10,
    scalingPattern: [3]
}

drawJPEG(utils.getStatistics(settings));