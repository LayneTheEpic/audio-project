import {randomBetween, randomColor} from "../src/util.js";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;

const canvasWidth = window.innerWidth;
const canvasHeight = window.innerHeight;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

const ctx = canvas.getContext("2d")!;


const box = {
	pos: {
		x: 0,
		y: 0
	},

	vel: {
		x: 7,
		y: 4
	},

	w: 100,
	h: 70,

	color: `#${randomColor("b0b0b0")}`
}



function update() {
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);


	box.pos.x += box.vel.x;
	box.pos.y += box.vel.y;


	if(box.pos.x + box.w >= canvasWidth || box.pos.x <= 0) {
		if(box.vel.x > 0) {
			box.vel.x = -(randomBetween(1, 15));
		} else {
			box.vel.x = randomBetween(1, 15);
		}

		const newColor = randomColor("b0b0b0");
		box.color = `#${newColor}`;
	}

	if(box.pos.y + box.h >= canvasHeight || box.pos.y <= 0) {
		if(box.vel.y > 0) {
			box.vel.y = -(randomBetween(1, 15));
		} else {
			box.vel.y = randomBetween(1, 15);
		}

		const newColor = randomColor("b0b0b0");
		box.color = `#${newColor}`;
	}


	ctx.fillStyle = box.color;
	ctx.fillRect(box.pos.x, box.pos.y, box.w, box.h);


	requestAnimationFrame(update);
}

requestAnimationFrame(update);
