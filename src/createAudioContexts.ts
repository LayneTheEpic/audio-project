import type {AudioContextCapsule, OfflineContextCapsule} from "./types";



export function createAudioContext(audioElement: HTMLAudioElement): AudioContextCapsule {
	const audioContext = new AudioContext();

	const audioSource = audioContext.createMediaElementSource(audioElement);



	const audioFrequencyAnalyzer = audioContext.createAnalyser();
	audioFrequencyAnalyzer.fftSize = 512;
	// audioFrequencyAnalyzer.smoothingTimeConstant = 0;


	// const audioBeatFilter = audioContext.createBiquadFilter();
	// audioBeatFilter.type = "lowpass";

	audioSource.connect(audioContext.destination);

	// audioSource.connect(audioBeatFilter).connect(audioFrequencyAnalyzer); // visualize beat-processed audio
	audioSource.connect(audioFrequencyAnalyzer);



	return {audioContext, audioFrequencyAnalyzer};
}



export function createOfflineAudioContext(dataBuffer: Float32Array, audioLength: number): OfflineContextCapsule {
	const offlineContext = new OfflineAudioContext({
		numberOfChannels: 2,
		length: Math.ceil(audioLength * 44100),
		sampleRate: 44100
	});


	const offlineSource = offlineContext.createBufferSource();
	const offlineBuffer = offlineContext.createBuffer(2, Math.ceil(audioLength * 44100), 44100);

	offlineBuffer.copyToChannel(dataBuffer, 2, 0);
	offlineSource.buffer = offlineBuffer;



	const offlineBeatFilter = offlineContext.createBiquadFilter();
	offlineBeatFilter.type = "lowpass";


	offlineSource.connect(offlineBeatFilter).connect(offlineContext.destination);



	return {
		offlineContext
	};
}
