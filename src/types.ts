export type AudioBufferResolver = (buffer: Promise<AudioBuffer>) => void;



export type AveragingBucket = {
	occurrences: number;
	offset: number;
	value: number;
	values: number[];
};



export type BeatData = {
	beatDistance: number;
	offset: number;
	tempo: number;
};



export type FileData = BeatData & {
	fileName: string;
	version: string;
};



export type ProcessedAudioFile = {
	audioBuffer: AudioBuffer;
	audioElement: HTMLAudioElement;
};



export type RenderCallback = (progress: number) => any;
