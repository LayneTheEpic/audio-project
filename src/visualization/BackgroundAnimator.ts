import FrameInterpreter from "./FrameInterpreter.js";
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
		const currentFrame = TimeInterpreter.interpret(time);
		const {hue, lightness} = FrameInterpreter.interpret(currentFrame);

		this.ctx.fillStyle = `hsl(${hue}, 100%, ${lightness}%)`;
		this.ctx.fillRect(0, 0, this.width, this.height);
	}

	static clear() {
		this.ctx.fillStyle = "#000000";
		this.ctx.fillRect(0, 0, this.width, this.height);
	}
}
