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



export type InputDataset = {
	label: string;
	type: "string";
	for: string;
	unit?: string;
} | {
	label: string;
	type: "number";
	for: string;
	unit?: string;
	min: string;
	max: string;
};

/* compacted but unreadable garbage
export type InputDataset = ({
	type: "string";
} | {
	type: "number";
	min: string;
	max: string;
}) & {
	label: string;
	for: string;
	unit?: string;
};
*/
