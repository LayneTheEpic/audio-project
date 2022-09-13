import { createAudioContext, createOfflineAudioContext } from "./createAudioContexts.js";
import getMostCommonInterval from "./beat-detection/getPeakIntervals.js";
import processAudioFile from "./processAudioFile.js";
import visualizeAudio, { initializeVisualization } from "./audioVisualizer.js";
import calculateBPM from "./beat-detection/calculateBPM.js";
const fileButton = document.getElementById("fileButton");
const input = document.getElementById("fileInput");
fileButton.addEventListener("click", () => { input.click(); }, { once: true });
input.addEventListener("change", handleAudioFile, { once: true });
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const { height } = canvas;
// power of 2 in range 16-16384
const frequencyCount = 512;
async function handleAudioFile() {
    const file = input.files[0];
    if (!file || !file.type.includes("audio/"))
        return;
    fileButton.classList.add("hide");
    const { audioElement, audioBuffer } = await processAudioFile(file);
    const audioFrequencyAnalyzer = createAudioContext(audioElement, frequencyCount);
    const offlineContext = createOfflineAudioContext(audioBuffer);
    // console.log(audioBuffer.getChannelData(0))
    const processedBuffer = await offlineContext.startRendering();
    const mostCommonInterval = getMostCommonInterval(processedBuffer);
    const beatData = calculateBPM(mostCommonInterval, audioBuffer.sampleRate, 40, 180, true);
    ctx.transform(1, 0, 0, -1, 0, height);
    initializeVisualization(audioFrequencyAnalyzer, beatData, ctx);
    audioElement.play();
    requestAnimationFrame(visualizeAudio);
}
/*

Ideas:

- beat detection (in progress)

*/
