import { animateBg, initializeBgAnimation } from "./animateBg.js";
import { scale } from "../util.js";
let analyzer;
let ctx;
let requestId;
export function initializeVisualization(_analyzer, beatData, _ctx) {
    analyzer = _analyzer;
    ctx = _ctx;
    initializeBgAnimation(beatData);
}
export function visualizeAudio() {
    const { width, height } = ctx.canvas;
    const frequencyCount = analyzer.frequencyBinCount;
    // data[n] = n * 44100/fftSize (in Hz)
    const data = new Uint8Array(frequencyCount);
    analyzer.getByteFrequencyData(data); // this is more like a "copyByteDataToArray"
    ctx.fillStyle = animateBg();
    ctx.fillRect(0, 0, width, height);
    const barWidth = Math.floor(width / frequencyCount);
    ctx.fillStyle = "#eee";
    ctx.strokeStyle = "#eee";
    ctx.lineWidth = 2;
    for (let i = 0; i < frequencyCount; i++) {
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
        if (i === frequencyCount - 1) {
            ctx.stroke();
        }
    }
    requestId = requestAnimationFrame(visualizeAudio);
}
export function getCurrentRequestId() {
    return requestId;
}
