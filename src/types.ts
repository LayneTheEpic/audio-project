export type AnimatedBackground = {
	hue: number;
	lightness: number;
};



export type AudioBufferResolver = (buffer: Promise<AudioBuffer>) => void;



export type AveragingBucket = {
	occurrences: number;
	offset: number;
	value: number;
	values: number[];
};



export type BackgroundAnimation = {
	fadeOut: number;
	maxLightness: number;
	rampUp: number;
	sustain: number;
};



export type BeatData = {
	beatDistance: number;
	offset: number;
	tempo: number;
};



export type FileData = {
	beatData: BeatData;
	fileName: string;
	version: string;
}



export type RenderCallback = (progress: number) => any;
