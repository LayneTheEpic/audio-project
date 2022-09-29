export default class BackgroundAnimator {
    static beatData;
    static ctx;
    static width;
    static height;
    static init(beatData, ctx) {
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
