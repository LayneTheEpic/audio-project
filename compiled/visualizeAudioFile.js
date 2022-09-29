import { createAudioContext } from "./createAudioContexts.js";
import getBeatData from "./getBeatData.js";
import processAudioFile from "./processAudioFile.js";
import WaveformAnimator from "./visualization/WaveformAnimator.js";
let currentAudioElement;
export async function visualizeAudioFile(file, ctx) {
    const { audioElement, audioBuffer } = await processAudioFile(file);
    currentAudioElement = audioElement;
    const audioFrequencyAnalyzer = createAudioContext(currentAudioElement, 512);
    const beatData = await getBeatData(file.name, audioBuffer);
    WaveformAnimator.init(audioFrequencyAnalyzer, beatData, ctx);
    currentAudioElement.play();
    requestAnimationFrame(WaveformAnimator.draw.bind(WaveformAnimator));
}
export function stopVisualization() {
    WaveformAnimator.stop();
}
