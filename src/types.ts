export type AudioData = {
	audioLength: number;
	audioElement: HTMLAudioElement;
	dataBuffer: Float32Array;
};



export type AudioContextCapsule = {
	audioContext: AudioContext;
	audioFrequencyAnalyzer: AnalyserNode;
};



export type OfflineContextCapsule = {
	offlineContext: OfflineAudioContext;
};
