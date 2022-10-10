import TimeInterpreter from "./TimeInterpreter.js";



export default class BackgroundAnimator {
	private static ctx: CanvasRenderingContext2D;

	private static width: number;
	private static height: number;

	static init(ctx: CanvasRenderingContext2D) {
		this.ctx = ctx;
		this.width = ctx.canvas.width;
		this.height = ctx.canvas.height;
	}

	static draw(time: number) {
		const frameData = TimeInterpreter.interpret(time);

		this.ctx.fillStyle = "#000";

		this.ctx.fillRect(0, 0, this.width, this.height);
	}
}
