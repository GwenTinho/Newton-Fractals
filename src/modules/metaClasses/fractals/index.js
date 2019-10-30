// a class to bunch up all the fractals
//doesnt yet implement the necessairy checks to see if its a fractal type object
class Fractals {
    constructor() {
        this.fractals = [];
    }
    add(fractal) {
        this.fractals.push(fractal);
    }

    length() {
        return this.fractals.length;
    }

    setFilePath(path) {
        this.fractals.forEach(fractal => fractal.setFilePath(path));
    }

    draw() {
        this.fractals.forEach((fractal, i) => {
            console.log("Drawing image nr." + (i + 1));
            fractal.draw();
        });
    }
}

export default Fractals