import AudioPlayer from "./AudioPlayer.js";
import AudioVisualizer from "./visualization/AudioVisualizer.js";
import { checkForCachedData, calculateBeatData } from "./beatData.js";
import { createAudioContext } from "./createAudioContexts.js";
import { createAudioElement, generateAudioBuffer } from "./processAudioFile.js";
import { omit } from "./util.js";
export async function visualizeAudioFile(file, ctx) {
    const cachedData = await checkForCachedData(file.name);
    const audioElement = createAudioElement(file);
    AudioPlayer.setAudio(audioElement);
    let beatData;
    if (cachedData) {
        beatData = omit(cachedData, ["fileName", "version"]);
    }
    else {
        const buffer = await generateAudioBuffer(file); // render manager needs to include this
        beatData = await calculateBeatData(file.name, buffer);
    }
    const audioFrequencyAnalyzer = createAudioContext(audioElement, 512);
    startVisualization(audioFrequencyAnalyzer, beatData, ctx);
}
function startVisualization(audioFrequencyAnalyzer, beatData, ctx) {
    AudioVisualizer.init(audioFrequencyAnalyzer, beatData, ctx);
    AudioPlayer.start();
    AudioVisualizer.start();
}
export function stopVisualization() {
    AudioPlayer.stop();
    AudioVisualizer.stop();
}
