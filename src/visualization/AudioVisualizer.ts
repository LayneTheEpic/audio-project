import AudioPlayer from "../AudioPlayer.js";
import BackgroundAnimator from "./BackgroundAnimator.js";
import TimeInterpreter from "./TimeInterpreter.js";
import WaveformAnimator from "./WaveformAnimator.js";

import type {BeatData} from "../types.js";



export default class AudioVisualizer {
	private static requestId: number;

	static init(analyzer: AnalyserNode, beatData: BeatData, ctx: CanvasRenderingContext2D) {
		BackgroundAnimator.init(ctx);
		TimeInterpreter.init(beatData);
		WaveformAnimator.init(analyzer, ctx);
	}

	static start() {
		requestAnimationFrame(this.loop.bind(this));
	}

	static loop() {
		const time = AudioPlayer.getTime();

		BackgroundAnimator.draw(time);
		WaveformAnimator.draw();

		this.requestId = requestAnimationFrame(this.loop.bind(this));
	}

	static stop() {
		cancelAnimationFrame(this.requestId);
	}
}


// I think this file will end up having the rAF loop in it  and it will call both Waveform and Background
