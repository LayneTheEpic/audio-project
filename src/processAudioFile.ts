import RenderProgressManager from "./dom/RenderProgressManager.js";



export function createAudioElement(file: File) {
	const audioUrl = URL.createObjectURL(file);
	return new Audio(audioUrl);
}



export async function generateAudioBuffer(file: File) {
	const rawBuffer = await file.arrayBuffer();

	const tempContext = new AudioContext();


	RenderProgressManager.show();
	const audioBuffer = await tempContext.decodeAudioData(rawBuffer);
	RenderProgressManager.awaitRender();


	return audioBuffer;
}
