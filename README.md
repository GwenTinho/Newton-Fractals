# Newton-Fractals


Try it out by cloning the repo, then running the following commands from the terminal :
- npm i
- npm start

Usage:
```
let fractals = new Fractals();

for (let i = 3; i < 4; i++) {
    let fractal = new Fractal(1600, i + 3, 0, i % 3);
    fractal.setFileName("fractal" + i + ".jpeg");
    fractal.setA(0.9, 0.3 * i);
    fractal.setIterations(600);
    fractals.add(fractal);

}

fractals.setFilePath("C:/Users/qschr/Desktop/gallery");
fractals.draw();
```

This project is licensed under the terms of the MIT license
