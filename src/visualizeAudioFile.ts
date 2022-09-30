import AudioVisualizer from "./visualization/AudioVisualizer.js";
import {createAudioContext} from "./createAudioContexts.js";
import getBeatData from "./getBeatData.js";
import processAudioFile from "./processAudioFile.js";



let currentAudioElement: HTMLAudioElement;



export async function visualizeAudioFile(file: File, ctx: CanvasRenderingContext2D) {
	const {audioElement, audioBuffer} = await processAudioFile(file);
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
