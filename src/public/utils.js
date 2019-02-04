function convertRange(value, r1, r2) {
    return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
}

function newtonsmethod(f) {
    return x => f(x) < 1e-14 ? x : newtonsmethod(f)(x - (f(x) * 1e-10) / (f(x + 1e-10) - f(x)));
}