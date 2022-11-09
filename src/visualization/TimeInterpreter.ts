import {isPlusOrMinus} from "../util.js";

import type {BeatData} from "../types/types.js";



export default class TimeInterpreter {
	private static frameOffset: number;
	private static frameBeatDistance: number;

	private static lastFrame: number;

	static init(beatData: BeatData) {
		this.frameOffset = 60 * beatData.offset;
		this.frameBeatDistance = 60 * beatData.beatDistance;

		this.lastFrame = 0;
	}

	private static expectedRound(frame: number) {
		// sometimes, frame numbers can be duplicated by a simple Math.round (eg. 1 1.9 2.4 4 = 1 2 2 4)
		// this function aims to figure out what the "correct" next frame is
		// without just doing +1 every frame = can be inaccurate if not called every frame

		const ceil = Math.ceil(frame);
		const floor = Math.floor(frame);
		const round = Math.round(frame);


		if(!isPlusOrMinus(frame, this.lastFrame, 2)) { // frame might've been skipped
			this.lastFrame = round;
			return round;
		}



		if(this.lastFrame + 1 === ceil) {
			this.lastFrame = ceil;
			return ceil;
		}

		if(this.lastFrame + 1 === floor) {
			this.lastFrame = floor;
			return floor;
		}


		this.lastFrame = round;
		return round;
	}

	static interpret(time: number) {
		const frameTime = time * 60;

		const withOffset = frameTime - this.frameOffset;

		if(withOffset < 0) {
			return 0;
		}

		// don't constantly increase frame, just wrap from 0 --> beatDist
		return this.expectedRound(withOffset % this.frameBeatDistance);
	}
}
