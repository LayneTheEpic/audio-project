import { createAudioContext } from "./createAudioContexts.js";
import { getCurrentRequestId, initializeVisualization, visualizeAudio } from "./visualization/visualizeAudio.js";
import processAudioFile from "./processAudioFile.js";
import getBeatData from "./getBeatData.js";
let currentAudioElement;
export async function visualizeAudioFile(file, ctx) {
    const { audioElement, audioBuffer } = await processAudioFile(file);
    currentAudioElement = audioElement;
    const audioFrequencyAnalyzer = createAudioContext(currentAudioElement, 512);
    const beatData = await getBeatData(file.name, audioBuffer);
    initializeVisualization(audioFrequencyAnalyzer, beatData, ctx);
    currentAudioElement.play();
    requestAnimationFrame(visualizeAudio);
}
export function stopVisualization() {
    currentAudioElement.pause();
    const requestId = getCurrentRequestId();
    if (!requestId)
        return;
    cancelAnimationFrame(requestId);
}
