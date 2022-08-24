import { scale } from "./util.js";
export default function visualizeAudio(ctx, audioContext, analyzer) {
    const { width, height } = ctx.canvas;
    const bars = analyzer.fftSize / 2; // 256 * (44100 / 512) = 22050; > max of human hearing
    // equivalent to analyzer.frequencyBinCount
    const bufferLength = analyzer.frequencyBinCount;
    // data[n] = n * 44100/fftSize (in Hz)
    const rawData = new Uint8Array(bufferLength);
    const data = rawData.subarray(0, bars);
    analyzer.getByteFrequencyData(data); // this is more like a "copyByteDataToArray"
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, width, height);
    const barWidth = Math.floor(width / bars);
    ctx.fillStyle = "#eee";
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 2;
    for (let i = 0; i < bars; i++) {
        const scaledBar = Math.round(scale(data[i], 0, 255, 0, height));
        if (i === 0) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, scaledBar);
            ctx.lineTo(barWidth - 1, scaledBar);
            continue;
        }
        ctx.lineTo(i * barWidth, scaledBar);
        ctx.lineTo((i + 1) * barWidth - 1, scaledBar);
        if (i === bars - 1) {
            ctx.stroke();
        }
    }
    requestAnimationFrame(() => visualizeAudio(ctx, audioContext, analyzer));
}
