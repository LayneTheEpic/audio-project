import type {BeatData} from "../types.js";



export default class BackgroundAnimator {
	private static beatData: BeatData;

	private static ctx: CanvasRenderingContext2D;

	private static width: number;
	private static height: number;

	static init(beatData: BeatData, ctx: CanvasRenderingContext2D) {
		this.beatData = beatData;

		this.ctx = ctx;
		this.width = ctx.canvas.width;
		this.height = ctx.canvas.height;
	}

	static draw() {
		this.ctx.fillStyle = "#000";

		this.ctx.fillRect(0, 0, this.width, this.height);
	}
}
