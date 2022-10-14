import AudioPlayer from "./AudioPlayer.js";
import AudioVisualizer from "./visualization/AudioVisualizer.js";
import {checkForCachedData, calculateBeatData} from "./beatData.js";
import {createAudioContext} from "./createAudioContexts.js";
import {createAudioElement, generateAudioBuffer} from "./processAudioFile.js";
import {omit} from "./util.js";

import type {BackgroundAnimation, BeatData} from "./types.js";



const backgroundAnimation = {
	fadeOut: 0.4,
	rampUp: 0.1,
	sustain: 0.1,

	maxLightness: 20
};



export async function visualizeAudioFile(file: File, ctx: CanvasRenderingContext2D) {
	const cachedData = await checkForCachedData(file.name);

	const audioElement = createAudioElement(file);
	AudioPlayer.setAudio(audioElement);


	let beatData;

	if(cachedData) {
		beatData = omit(cachedData, ["fileName", "version"]) as BeatData;
	} else {
		const buffer = await generateAudioBuffer(file); // render manager needs to include this
		beatData = await calculateBeatData(file.name, buffer);
	}


	const audioFrequencyAnalyzer = createAudioContext(audioElement, 512);

	startVisualization(audioFrequencyAnalyzer, backgroundAnimation, beatData, ctx);
}



function startVisualization(audioFrequencyAnalyzer: AnalyserNode, backgroundAnimation: BackgroundAnimation, beatData: BeatData, ctx: CanvasRenderingContext2D) {
	AudioVisualizer.init(audioFrequencyAnalyzer, backgroundAnimation, beatData, ctx);

	AudioPlayer.start();
	AudioVisualizer.start();
}



export function stopVisualization() {
	AudioPlayer.stop();
	AudioVisualizer.stop();
}
