import BackgroundAnimator from "./BackgroundAnimator.js";
import { scale } from "../util.js";
export default class WaveformAnimator {
    static analyzer;
    static ctx;
    static width;
    static height;
    static barWidth;
    static init(analyzer, beatData, ctx) {
        this.analyzer = analyzer;
        this.ctx = ctx;
        this.width = ctx.canvas.width;
        this.height = ctx.canvas.height;
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "#eee";
        this.changeFrequencyCount(2 ** 9);
        BackgroundAnimator.init(beatData);
    }
    static draw() {
        const frequencyCount = this.analyzer.frequencyBinCount;
        // data[n] = n * 44100/fftSize (in Hz)
        const data = new Uint8Array(frequencyCount);
        this.analyzer.getByteFrequencyData(data); // this is more like a "copyByteDataToArray"
        // change this so that Background itself draws
        this.ctx.fillStyle = BackgroundAnimator.animate();
        this.ctx.fillRect(0, 0, this.width, this.height);
        for (let i = 0; i < frequencyCount; i++) {
            const scaledBar = Math.round(scale(data[i], 0, 255, 0, this.height));
            if (i === 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(0, 0);
                this.ctx.lineTo(0, scaledBar);
                this.ctx.lineTo(this.barWidth - 1, scaledBar);
                continue;
            }
            this.ctx.lineTo(i * this.barWidth, scaledBar);
            this.ctx.lineTo((i + 1) * this.barWidth - 1, scaledBar);
            if (i === frequencyCount - 1) {
                this.ctx.stroke();
            }
        }
    }
    static changeFrequencyCount(frequencyCount) {
        let fftSize = frequencyCount * 2;
        this.barWidth = Math.floor(this.width / frequencyCount) || 1;
        this.analyzer.fftSize = fftSize;
    }
}
