import BackgroundAnimator from "./visualization/BackgroundAnimator.js";
import WaveformAnimator from "./visualization/WaveformAnimator.js";



export default class AudioVisualizer {
	private static requestId: number;

	static init() {

	}

	static start() {
		requestAnimationFrame(this.loop);
	}

	private static loop() {
		BackgroundAnimator.draw();
		WaveformAnimator.draw();

		this.requestId = requestAnimationFrame(this.loop.bind(this));
	}

	static stop() {
		cancelAnimationFrame(this.requestId);
	}
}



// I think this file will end up having the rAF loop in it  and it will call both Waveform and Background
