const canvas_image = document.querySelector(".image");
const ctx_image = canvas_image.getContext("2d");

const img = new Image();
const anchor = new Image();

// img.onload = function() { // quand l'image est chargée (onload returns True)
//    // ctx_image.drawImage(img, 0, 0, 600, 400); // effectue cette fonction
//     ctx_image.drawImage(anchor, 0, 0, 600, 400);
// }

// img.src = "../images/astro/astro1.jpg";

anchor.src = "anchor-svgrepo-com.svg";
const canvasSizeX = 600;
const canvasSizeY = 400;
const dx = 1;
const dy = 1;
var x = 0;
var y = 0;

function init() {
    img.src = "../images/astro/astro1.jpg";
    window.requestAnimationFrame(draw);
}

function draw () {
    ctx_image.clearRect(-1, -1, 600, 400);

    if (x > canvasSizeX) {
        ctx_image.translate(-canvasSizeX, -canvasSizeY);
        x = 0;
        y = 0;
    } else {
        ctx_image.drawImage(img, 0, 0, 60, 40);
        ctx_image.translate(dx, dy);
        x = x + dx;
        y = y + dy;
    }
    window.requestAnimationFrame(draw);
}

init();