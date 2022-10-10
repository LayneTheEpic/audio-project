import AudioVisualizer from "./visualization/AudioVisualizer.js";
import {createAudioContext} from "./createAudioContexts.js";
import getBeatData from "./getBeatData.js";
import processAudioFile from "./processAudioFile.js";
import AudioPlayer from "./AudioPlayer.js";



export async function visualizeAudioFile(file: File, ctx: CanvasRenderingContext2D) {
	const {audioElement, audioBuffer} = await processAudioFile(file);
	AudioPlayer.setAudio(audioElement);


	const audioFrequencyAnalyzer = createAudioContext(audioElement, 512);


	const beatData = await getBeatData(file.name, audioBuffer);


	AudioVisualizer.init(audioFrequencyAnalyzer, beatData, ctx);

	AudioPlayer.start();
	AudioVisualizer.start();
}



export function stopVisualization() {
	AudioVisualizer.stop();
}
