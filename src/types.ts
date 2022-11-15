export type AnimatedBackground = {
	hue: number;
	lightness: number;
};



export type AnimationProperty = "ramp" | "sustain" | "fade" | "lightness";



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



type BaseInputDataset = {
	label: string;
	for: string;
	unit?: string;
}



export type InputDataset = BaseInputDataset & ({
	type: "string";
} | {
	type: "number";
	range?: string;
});
