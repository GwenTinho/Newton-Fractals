let ctx = canvas.getContext('2d');
ctx.font = "20px Georgia";
ctx.fillStyle = "black";

window.onload = async () => {
    let request = await fetch("/api/genImageData.json");
    let data = await request.json();

    const [image, rootlength, w, h, maxIteration] = [data.image, data.rootlength, data.w, data.h, data.maxIteration];

    ctx.canvas.width = w;
    ctx.canvas.height = h;

    for (let y = 0; y < image.length; y++) {
        for (let x = 0; x < image[0].length; x++) {
            if (image[y][x] !== 0) drawDot(x, y, image[y][x][1], mapColour(maxIteration, rootlength));
        }
    }
}