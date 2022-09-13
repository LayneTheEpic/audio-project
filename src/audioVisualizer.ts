import type {BeatData} from "./types.js";
import {randomBetween, scale} from "./util.js";



let analyzer: AnalyserNode;
let beatData: BeatData;
let ctx: CanvasRenderingContext2D;


let frame: number;

let framesPerBeat: number;


let baseHue = 0; // values in animation
let lightness = 0;

const lightnessJump = 15;
let lightnessStep: number;

const rampUpFrames = 5;

let bgColor: string = "hsl(0, 100%, 0%)";



export function initializeVisualization(_analyzer: AnalyserNode, _beatData: BeatData, _ctx: CanvasRenderingContext2D) {
	analyzer = _analyzer;
	beatData = _beatData;
	ctx = _ctx;

	frame = -(60 * beatData.offset); // convert seconds to frames; offset

	framesPerBeat = 3600 / beatData.tempo; // equivalent to 60 / (tempo / 60)

	lightnessStep = lightnessJump / framesPerBeat;
}



export function visualizeAudio() {
	const {width, height} = ctx.canvas;

	const frequencyCount = analyzer.frequencyBinCount;

	// data[n] = n * 44100/fftSize (in Hz)
	const data = new Uint8Array(frequencyCount);
	analyzer.getByteFrequencyData(data); // this is more like a "copyByteDataToArray"


	animateBg();


	ctx.fillStyle = bgColor;
	ctx.fillRect(0, 0, width, height);

	const barWidth = Math.floor(width / frequencyCount);
	ctx.fillStyle = "#eee";
	ctx.strokeStyle = "#eee";
	ctx.lineWidth = 2;


	for(let i = 0; i < frequencyCount; i++) {
		const scaledBar = Math.round(scale(data[i], 0, 255, 0, height));

		if(i === 0) {
			ctx.beginPath();

			ctx.moveTo(0, 0);
			ctx.lineTo(0, scaledBar);
			ctx.lineTo(barWidth - 1, scaledBar);

			continue;
		}


		ctx.lineTo(i * barWidth, scaledBar);
		ctx.lineTo((i + 1) * barWidth - 1, scaledBar);


		if(i === frequencyCount - 1) {
			ctx.stroke();
		}
	}


	requestAnimationFrame(visualizeAudio);
}



function animateBg() {
	frame++;

	// ramp-up: from 5 frames before the beat, fade the color in
	if(frame < framesPerBeat && (frame + rampUpFrames) > framesPerBeat) {
		lightness += (lightnessJump / rampUpFrames);
	}

	if(frame < framesPerBeat && (frame + rampUpFrames) > framesPerBeat && (frame + rampUpFrames - 1) < framesPerBeat) {
		baseHue = randomBetween(0, 360);
	}


	if(frame >= framesPerBeat) {
		frame -= framesPerBeat;

		lightness = lightnessJump;
	}


	lightness -= lightnessStep;

	if(lightness < 0) lightness = 0;


	bgColor = `hsl(${baseHue}, 100%, ${lightness}%)`;
}
