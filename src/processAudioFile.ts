import type {ProcessedAudioFileData} from "./types.js";



export default async function processAudioFile(file: File): Promise<ProcessedAudioFileData> {
	const audioUrl = URL.createObjectURL(file); // turn the file contents into something accessible
	const audioElement = new Audio(audioUrl);


	const rawBuffer = await (await fetch(audioUrl)).arrayBuffer();

	const tempContext = new AudioContext();
	const audioBuffer = await tempContext.decodeAudioData(rawBuffer);


	return {
		audioElement,
		audioBuffer
	};
}
