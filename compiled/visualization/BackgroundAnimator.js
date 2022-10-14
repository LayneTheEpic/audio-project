import FrameInterpreter from "./FrameInterpreter.js";
import TimeInterpreter from "./TimeInterpreter.js";
export default class BackgroundAnimator {
    static ctx;
    static width;
    static height;
    static init(ctx) {
        this.ctx = ctx;
        this.width = ctx.canvas.width;
        this.height = ctx.canvas.height;
    }
    static draw(time) {
        const currentFrame = TimeInterpreter.interpret(time);
        const { hue, lightness } = FrameInterpreter.interpret(currentFrame);
        this.ctx.fillStyle = `hsl(${hue}, 100%, ${lightness}%)`;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
}
