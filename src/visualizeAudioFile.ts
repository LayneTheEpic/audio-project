import {createAudioContext} from "./createAudioContexts.js";
import getBeatData from "./getBeatData.js";
import {getCurrentRequestId,  initializeVisualization, visualizeAudio} from "./visualization/visualizeAudio.js";
import processAudioFile from "./processAudioFile.js";



let currentAudioElement: HTMLAudioElement;



export async function visualizeAudioFile(file: File, ctx: CanvasRenderingContext2D) {
	const {audioElement, audioBuffer} = await processAudioFile(file);
	currentAudioElement = audioElement;


	const audioFrequencyAnalyzer = createAudioContext(currentAudioElement, 512);


	const beatData = await getBeatData(file.name, audioBuffer);


	initializeVisualization(audioFrequencyAnalyzer, beatData, ctx);

	currentAudioElement.play();
	requestAnimationFrame(visualizeAudio);
}



export function stopVisualization() {
	currentAudioElement?.pause();

	const requestId = getCurrentRequestId();

	if(!requestId) return;
	cancelAnimationFrame(requestId);
}
