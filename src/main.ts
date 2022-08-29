import visualizeAudio from "./audioVisualizer.js";
import {createAudioContext, createOfflineAudioContext} from "./createAudioContexts.js";
import type {AudioData} from "./types.js";



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


	const {audioContext, audioFrequencyAnalyzer} = createAudioContext(audioElement);


	const {offlineContext} = createOfflineAudioContext(dataBuffer, audioLength);







	audioElement.play();

	const processedBuffer = await offlineContext.startRendering();



	ctx.transform(1, 0, 0, -1, 0, height);

	requestAnimationFrame(() => visualizeAudio(ctx, audioContext, audioFrequencyAnalyzer));
}



async function processAudioFile(file: File): Promise<AudioData> {
	const audioUrl = URL.createObjectURL(file); // turn the file contents into something accessible
	const audioElement = new Audio(audioUrl);


	const audioLength = await new Promise(resolve => {
		audioElement.addEventListener("durationchange", () => {
			resolve(audioElement.duration);
		}, {once: true});
	}) as number;



	const fileReader = new FileReader();

	const dataBuffer = await new Promise(resolve => {
		fileReader.addEventListener("load", () => { // I hate how condensed this is but I can't do much about it
			resolve(new Float32Array(fileReader.result as ArrayBuffer));
		}, {once: true});

		fileReader.readAsArrayBuffer(file);
	}) as Float32Array;



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
