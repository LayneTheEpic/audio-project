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
        const frameData = TimeInterpreter.interpret(time);
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
}
