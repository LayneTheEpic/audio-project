import visualizeAudio from "./audioVisualizer.js";
import {createAudioContext, createOfflineAudioContext} from "./createAudioContexts.js";
import processAudioFile from "./processAudioFile.js";



const fileButton = document.getElementById("fileButton")! as HTMLButtonElement;
const input = document.getElementById("fileInput")! as HTMLInputElement;

fileButton.addEventListener("click", () => {input.click()});
input.addEventListener("change", handleAudioFile);


const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const {width, height} = canvas;



async function handleAudioFile() {
	const file = input.files![0];

	if(!file || !file.type.includes("audio/")) return;

	fileButton.classList.add("hide");



	const {audioElement, audioLength, dataBuffer} = await processAudioFile(file);
	alert("we made it out!")

	const {audioContext, audioFrequencyAnalyzer} = createAudioContext(audioElement);
	const {offlineContext} = createOfflineAudioContext(dataBuffer, audioLength);



	audioElement.play();

	// const processedBuffer = await offlineContext.startRendering();



	ctx.transform(1, 0, 0, -1, 0, height);

	requestAnimationFrame(() => visualizeAudio(ctx, audioContext, audioFrequencyAnalyzer));
}



/*

Ideas:

beat detection changes bg (hsl)


implementation:
	- preload audio into offlinecontext, process, identify peak

*/
