import utils from "../misc/utils";
import tinyColor from "tinycolor2";
import smoothColors from "./colorSmoothing";

function mapColour() { // note to self: need to find more elegant coloring algorithm that i actually understand
    return genPixelOutput => {
        const h = utils.convertRange(genPixelOutput.rootIteration, [0, genPixelOutput.rootLength - 1], [0, 240]);
        const l = utils.convertRange(genPixelOutput.iteration, [0, genPixelOutput.maxIteration - 1], [10, 80]);
        return `hsl(${h},100%,${l}%)`;
    }
}

function mapSmoothColour() {
    return genPixelOutput => {
        const out = tinyColor.fromRatio(smoothColors.getSmoothHSV(genPixelOutput));
        return out.toRgbString();
    }
}

function black(v) {
    return "black";
}

function white(v) {
    return "white";
}

export default {
    white,
    black,
    mapColour,
    mapSmoothColour
}