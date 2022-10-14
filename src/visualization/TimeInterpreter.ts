import type {BeatData} from "../types.js";
import {isPlusOrMinus} from "../util.js";



export default class TimeInterpreter {
	private static beatData: BeatData;

	private static lastFrame: number;

	static init(beatData: BeatData) {
		this.beatData = beatData;

		this.lastFrame = 0;
	}

	private static expectedRound(frame: number) {
		// sometimes, frame numbers can be duplicated by a simple Math.round (eg. 1 1.9 2.4 4 = 1 2 2 4)
		// this function aims to figure out what the "correct" next frame is
		// without just doing +1 every frame = can be inaccurate if not called every frame

		const ceil = Math.ceil(frame);
		const floor = Math.floor(frame);
		const round = Math.round(frame);


		if(!isPlusOrMinus(frame, 2, this.lastFrame)) { // frame might've been skipped
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
		const timeFromBeat = time % this.beatData.beatDistance;

		return this.expectedRound(timeFromBeat * 60);
	}
}
