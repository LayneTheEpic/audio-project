import type {AnimatedBackground, BackgroundAnimation, BeatData} from "../types.js";



export default class FrameInterpreter {
	private static framesPerBeat: number;

	private static fadeFrames: number;
	private static rampFrames: number;
	private static sustainFrames: number;

	private static maxLightness: number;

	private static lightness: number = 0;
	private static hue: number = 0;

	static init(backgroundAnimation: BackgroundAnimation, beatData: BeatData) {
		// this.backgroundAnimation = backgroundAnimation;
		// this.beaData = beatData;

		this.framesPerBeat = Math.round(beatData.beatDistance);

		this.fadeFrames = Math.round(backgroundAnimation.fadeOut * beatData.beatDistance);
		this.rampFrames = Math.round(backgroundAnimation.rampUp * beatData.beatDistance);
		this.sustainFrames = Math.round(backgroundAnimation.sustain * beatData.beatDistance);

		this.maxLightness = backgroundAnimation.maxLightness;
	}

	static interpret(frame: number): AnimatedBackground {
		// if(frame + this.fadeFrames > this.framesPerBeat) {

		// }

		let rampFrames = frame - this.framesPerBeat;

		// console.log(rampFrames)


		console.log(this.rampFrames) // why is this 0


		if(rampFrames > 0 && rampFrames <= this.rampFrames) {
			// console.log(rampFrames);
		}


		// uhfsjfdhfgkjdfhkgj this is so draining

		return {
			hue: 0,
			lightness: 0
		}
	}
}

