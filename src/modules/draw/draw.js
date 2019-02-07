function drawSquareAroundPoint(x, y, l, v, colorFn, ctx) {
    ctx.fillStyle = colorFn(v);
    ctx.beginPath();
    ctx.rect(x - l / 2, y + l / 2, l, l);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "black";
}

function clearCanvas(ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawDot(x, y, v, colorFn, ctx) {
    drawSquareAroundPoint(x, y, 1, v, colorFn, ctx);
}

export {
    drawDot
}