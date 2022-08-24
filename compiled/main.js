import visualizeAudio from "./audioVisualizer.js";
const fileButton = document.getElementById("fileButton");
const input = document.getElementById("fileInput");
fileButton.addEventListener("click", () => { input.click(); });
input.addEventListener("change", main);
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const { width, height } = canvas;
async function main() {
    const file = input.files[0];
    if (!file || !file.type.includes("audio/"))
        return;
    fileButton.classList.add("hide");
    const audioContext = new AudioContext();
    // Create audioSource
    const audioUrl = URL.createObjectURL(file); // turn the file contents into something accessible
    const audioElement = new Audio(audioUrl);
    const fileReader = new FileReader();
    const dataBuffer = await new Promise(resolve => {
        fileReader.addEventListener("load", () => {
            resolve(fileReader.result);
        });
        fileReader.readAsArrayBuffer(file);
    });
    const float32Buffer = new Float32Array(dataBuffer);
    const audioSource = audioContext.createMediaElementSource(audioElement);
    // Create offlineContext (this will calculate where beats land in the background)
    const audioLength = await new Promise(resolve => {
        audioElement.addEventListener("durationchange", () => {
            resolve(audioElement.duration);
        }, { once: true });
    });
    // alert(Math.round(audio.duration * 44100));
    const offlineContext = new OfflineAudioContext({
        numberOfChannels: 2,
        length: Math.ceil(audioLength * 44100),
        sampleRate: 44100
    });
    const offlineSource = offlineContext.createBufferSource();
    const offlineBuffer = offlineContext.createBuffer(2, Math.ceil(audioLength * 44100), 44100);
    // what am I even writing anymore
    offlineBuffer.copyToChannel(float32Buffer, 2, 0);
    offlineSource.buffer = offlineBuffer;
    // Visualization
    const frequencyAnalyzer = audioContext.createAnalyser();
    frequencyAnalyzer.fftSize = 512;
    // frequencyAnalyzer.smoothingTimeConstant = 0;
    // Beat detection
    const audioBeatFilter = audioContext.createBiquadFilter();
    audioBeatFilter.type = "lowpass";
    const offlineBeatFilter = offlineContext.createBiquadFilter();
    offlineBeatFilter.type = "lowpass";
    // Connect things
    audioSource.connect(audioContext.destination);
    audioSource.connect(frequencyAnalyzer);
    // audioSource.connect(audioBeatFilter).connect(frequencyAnalyzer); // debugging
    offlineSource.connect(offlineBeatFilter).connect(offlineContext.destination);
    audioElement.play();
    const processedBuffer = await offlineContext.startRendering();
    ctx.transform(1, 0, 0, -1, 0, height);
    requestAnimationFrame(() => visualizeAudio(ctx, audioContext, frequencyAnalyzer));
}
/*

Ideas:

beat detection changes bg (hsl)


implementation:
    - preload audio into offlinecontext, process, identify peak

*/
