import {randomBetween} from "../util.js";
import type {BeatData} from "../types.js";



let frame: number;

let baseHue = 0; // values in animation
let lightness = 0;

const lightnessJump = 15;
let lightnessStep: number;

const rampUpFrames = 5;



let framesPerBeat: number;



export function initializeBgAnimation(beatData: BeatData) {
	frame = -(60 * beatData.offset); // convert seconds to frames; offset

	framesPerBeat = 3600 / beatData.tempo; // equivalent to 60 / (tempo / 60)

	lightnessStep = lightnessJump / framesPerBeat;
}



export function animateBg() {
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


	return `hsl(${baseHue}, 100%, ${lightness}%)`;
}
