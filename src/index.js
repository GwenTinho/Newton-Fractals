import utils from "../src/modules/utils";
import drawJPEG from "./modules/draw";

////settings

const settings = {
    n: 3,
    w: 30,
    h: 30,
    scalingPattern: [4, 3, 2, 2] /// 3.3hrs
}

drawJPEG(utils.getStatistics(settings));