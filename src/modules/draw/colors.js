import utils from "../utils";

function colors(v) //Assign a color for each root
{
    if (v === 0) return "FF0000";
    if (v === 1) return "00FF00";
    if (v === 2) return "0000FF";
    if (v === 3) return "00FFFF";
    if (v === 4) return "FF69B4";
}


function colorsByRoots(roots) {
    return v => {
        v = Math.floor(utils.convertRange(v, [0, roots], [2 ** 7, 2 ** 24 - 1]));
        v = v.toString(16).toUpperCase();
        return v;
    }
}

function colorsByIteration(maxIt) //Assign a color for each root
{
    return v => {
        v = Math.floor(utils.convertRange(v, [1, maxIt - 1], [0, 2 ** 24 - 1]));
        if (v === 0) return "000000";
        v = v.toString(16).toUpperCase();
        return v;
    }
}

function mapColour(maxIt, rootl) {
    return arr => {
        const h = utils.convertRange(arr[1], [0, rootl], [0, 240]);
        const l = utils.convertRange(arr[0], [0, maxIt], [70 - maxIt, 70]);
        return `hsl(${h},100%,${l}%)`;
    }
}

function hslToRgb(h, s, l) {
    let r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        let hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.min(Math.floor(r * 256), 255), Math.min(Math.floor(g * 256), 255), Math.min(Math.floor(b * 256), 255)];
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
    mapColour
}