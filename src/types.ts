export type ProcessedAudioFileData = {
	audioElement: HTMLAudioElement;
	audioBuffer: AudioBuffer;
};



export type AudioContextCapsule = {
	audioContext: AudioContext;
	audioFrequencyAnalyzer: AnalyserNode;
};
