import visualizeAudio from "./audioVisualizer.js";
import { createAudioContext, createOfflineAudioContext } from "./createAudioContexts.js";
import processAudioFile from "./processAudioFile.js";
const fileButton = document.getElementById("fileButton");
const input = document.getElementById("fileInput");
fileButton.addEventListener("click", () => { input.click(); });
input.addEventListener("change", handleAudioFile);
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
    const { audioContext, audioFrequencyAnalyzer } = createAudioContext(audioElement, frequencyCount);
    const offlineContext = createOfflineAudioContext(audioBuffer);
    const processedBuffer = await offlineContext.startRendering();
    audioElement.play();
    ctx.transform(1, 0, 0, -1, 0, height);
    requestAnimationFrame(() => visualizeAudio(ctx, audioContext, audioFrequencyAnalyzer));
}
/*

Ideas:

beat detection changes bg (hsl)


implementation:
    - preload audio into offlinecontext, process, identify peak

*/
