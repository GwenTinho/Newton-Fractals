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
        v = Math.floor(convertRange(v, [0, roots], [2 ** 7, 2 ** 24 - 1]));
        v = v.toString(16).toUpperCase();
        return v;
    }
}

function colorsByIteration(maxIt) //Assign a color for each root
{
    return v => {
        v = Math.floor(convertRange(v, [1, maxIt - 1], [0, 2 ** 24 - 1]));
        if (v === 0) return "000000";
        v = v.toString(16).toUpperCase();
        return v;
    }
}

function mapColour(maxIt, rootl) {
    return n => {
        h = convertRange(n, [0, rootl], [0, 240]);
        l = convertRange(n, [0, maxIt], [45, 55]);
        return `hsl(${h},100%,${l}%)`;
    }
}