import AudioVisualizer from "./visualization/AudioVisualizer.js";
import { createAudioContext } from "./createAudioContexts.js";
import getBeatData from "./getBeatData.js";
import processAudioFile from "./processAudioFile.js";
let currentAudioElement;
export async function visualizeAudioFile(file, ctx) {
    const { audioElement, audioBuffer } = await processAudioFile(file);
    currentAudioElement = audioElement;
    const audioFrequencyAnalyzer = createAudioContext(currentAudioElement, 512);
    const beatData = await getBeatData(file.name, audioBuffer);
    AudioVisualizer.init(audioFrequencyAnalyzer, beatData, ctx);
    currentAudioElement.play();
    AudioVisualizer.start();
}
export function stopVisualization() {
    AudioVisualizer.stop();
}
