import { scale } from "../util.js";
const defaultFrequencyCount = 2 ** 9;
export default class WaveformAnimator {
    static analyzer;
    static ctx;
    static width;
    static height;
    static barWidth;
    static queuedFrequencyCount = null;
    static init(analyzer, ctx) {
        this.analyzer = analyzer;
        this.ctx = ctx;
        this.width = ctx.canvas.width;
        this.height = ctx.canvas.height;
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "#eee";
        // it's possible that someone might change the bar factor before this is inited,
        // if it is, it is "queued"; use the queued value if there is one,
        // or otherwise default to 512 bars.
        this.setFrequencyCount(this.queuedFrequencyCount ?? defaultFrequencyCount);
    }
    static draw() {
        const frequencyCount = this.analyzer.frequencyBinCount;
        // data[n] = n * 44100/fftSize (in Hz)
        const data = new Uint8Array(frequencyCount);
        this.analyzer.getByteFrequencyData(data); // this is more like a "copyByteDataToArray"
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
    static setFrequencyCount(frequencyCount) {
        let fftSize = frequencyCount * 2;
        this.barWidth = Math.floor(this.width / frequencyCount) || 1;
        if (this.analyzer) {
            this.analyzer.fftSize = fftSize;
        }
        else {
            this.queuedFrequencyCount = frequencyCount;
        }
    }
}
