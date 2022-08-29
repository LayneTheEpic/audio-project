import visualizeAudio from "./audioVisualizer.js";
import { createAudioContext, createOfflineAudioContext } from "./createAudioContexts.js";
const fileButton = document.getElementById("fileButton");
const input = document.getElementById("fileInput");
fileButton.addEventListener("click", () => { input.click(); });
input.addEventListener("change", handleAudioFile);
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const { width, height } = canvas;
async function handleAudioFile() {
    const file = input.files[0];
    if (!file || !file.type.includes("audio/"))
        return;
    fileButton.classList.add("hide");
    const { audioElement, audioLength, dataBuffer } = await processAudioFile(file);
    const { audioContext, audioFrequencyAnalyzer } = createAudioContext(audioElement);
    const { offlineContext } = createOfflineAudioContext(dataBuffer, audioLength);
    audioElement.play();
    const processedBuffer = await offlineContext.startRendering();
    ctx.transform(1, 0, 0, -1, 0, height);
    requestAnimationFrame(() => visualizeAudio(ctx, audioContext, audioFrequencyAnalyzer));
}
async function processAudioFile(file) {
    const audioUrl = URL.createObjectURL(file); // turn the file contents into something accessible
    const audioElement = new Audio(audioUrl);
    const audioLength = await new Promise(resolve => {
        audioElement.addEventListener("durationchange", () => {
            resolve(audioElement.duration);
        }, { once: true });
    });
    const fileReader = new FileReader();
    const dataBuffer = await new Promise(resolve => {
        fileReader.addEventListener("load", () => {
            resolve(new Float32Array(fileReader.result));
        }, { once: true });
        fileReader.readAsArrayBuffer(file);
    });
    return {
        audioLength,
        audioElement,
        dataBuffer
    };
}
/*

Ideas:

beat detection changes bg (hsl)


implementation:
    - preload audio into offlinecontext, process, identify peak

*/
