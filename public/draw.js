function drawSquareAroundPoint(x, y, l, v, colorFn) {
    ctx.fillStyle = colorFn(v);
    ctx.beginPath();
    ctx.rect(x - l / 2, y + l / 2, l, l);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "black";
}

function drawText(text, x, y) {
    ctx.fillStyle = "white";
    ctx.fillText(text, x, y);
    ctx.fillStyle = "black";
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawDot(x, y, v, colorFn) {
    drawSquareAroundPoint(x, y, 1, v, colorFn);
}

function savecanvas() {

    let canvasElement = document.getElementById("canvas");

    let MIME_TYPE = "image/png";

    let imgURL = canvasElement.toDataURL(MIME_TYPE);

    let dlLink = document.createElement('a');
    dlLink.download = "newtonfractal";
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
}