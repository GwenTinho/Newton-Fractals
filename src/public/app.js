let ctx = canvas.getContext('2d');
ctx.font = "20px Georgia";
ctx.fillStyle = "black";

async function loadimg(path) {
    let request = await fetch(path);
    let data = await request.json();

    const [image, rootlength, w, h, maxIteration] = [data.image, data.rootlength, data.w, data.h, data.maxIteration];

    ctx.canvas.width = w;
    ctx.canvas.height = h;

    clearCanvas();
    for (let y = 0; y < image.length; y++) {
        for (let x = 0; x < image[0].length; x++) {
            if (image[y][x][0] !== -1) drawDot(x, y, image[y][x], mapColour(maxIteration, rootlength));
            else drawDot(x, y, 0, black);
        }
    }
}


function download() {
    var download = document.getElementById("download");
    var image = document.getElementById("canvas").toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
}

window.onload = () => {
    ctx.canvas.width = 0;
    ctx.canvas.height = 0;
    document.getElementById("load").addEventListener("click", e => {
        loadimg("/api/genImageData.json");
    });
    document.getElementById("loadFromMemory").addEventListener("click", e => {
        loadimg("/api/image.json");
    });
}