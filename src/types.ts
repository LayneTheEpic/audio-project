export type ProcessedAudioFileData = {
	audioElement: HTMLAudioElement;
	audioBuffer: AudioBuffer;
};



export type AudioContextCapsule = {
	audioContext: AudioContext;
	audioFrequencyAnalyzer: AnalyserNode;
};



export type IntervalBucket = {
	interval: number;
	peaks: number[];
};



export type AveragingBucket = {
	values: number[],
	display: number
};
