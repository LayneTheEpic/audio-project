import BackgroundAnimationState from "./BackgroundAnimationState.js";
import {clamp, randomBetween} from "../util.js";

import type {AnimatedBackground, BackgroundAnimation, BeatData} from "../types.js";



export default class FrameInterpreter {
	private static framesPerBeat: number;

	private static rampFrames: number;
	private static sustainFrames: number;
	private static fadeFrames: number;

	private static fadeSustain: number;

	private static maxLightness: number;
	private static rampLightness: number;
	private static fadeLightness: number;

	private static lightness: number = 0;
	private static hue: number = 0;

	private static queuedBgAnimation?: BackgroundAnimation = undefined;

	static init(beatData: BeatData) {
		this.framesPerBeat = Math.round(60 * beatData.beatDistance);

		// use queued anim if it exists; otherwise fetch default
		this.calculateFrameTimes(this.queuedBgAnimation ?? BackgroundAnimationState.get());
	}

	static interpret(frame: number): AnimatedBackground {
		let rampFrame = this.framesPerBeat - frame;

		// Color ramping
		if(rampFrame === this.rampFrames) {
			this.hue = randomBetween(1, 360);
		}

		if(rampFrame <= this.rampFrames) {
			this.lightness += this.rampLightness;
		}


		// Color sustaining
		if(frame <= this.sustainFrames) { // ramp is included in 0
			this.lightness = this.lightness;
			// yes this is redundant but just for clarity
		}

		if(frame > this.sustainFrames && frame <= this.fadeSustain) {
			this.lightness -= this.fadeLightness;
		}

		if(frame > this.fadeSustain && frame < this.framesPerBeat && !(rampFrame <= this.rampFrames)) {
			this.lightness = 0;
		}

		this.lightness = (this.lightness < 0) ? 0 : this.lightness;
		this.lightness = (this.lightness > 100) ? 100 : this.lightness;


		this.lightness = clamp(this.lightness, 0, 100);

		return {
			hue: this.hue,
			lightness: this.lightness
		}
	}

	static calculateFrameTimes(backgroundAnimation: BackgroundAnimation) {
		if(!this.framesPerBeat) {
			this.queuedBgAnimation = backgroundAnimation;
			return;
		}

		this.rampFrames = Math.round(backgroundAnimation.rampUp * this.framesPerBeat);

		this.sustainFrames = Math.round(backgroundAnimation.sustain * this.framesPerBeat);
		this.fadeFrames = Math.round(backgroundAnimation.fadeOut * this.framesPerBeat);

		this.fadeSustain = this.sustainFrames + this.fadeFrames;

		this.maxLightness = backgroundAnimation.maxLightness;

		this.rampLightness = this.maxLightness / this.rampFrames;
		this.fadeLightness = this.maxLightness / this.fadeFrames;
	}
}
