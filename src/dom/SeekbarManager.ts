import {getId} from "../util.js";



// const seekbarContainer = getId<HTMLDivElement>("seekbar-container");
const seekbarProgress = getId<HTMLDivElement>("seekbar-progress");
const seekbarGrabber = getId<HTMLDivElement>("seekbar-grabber");



export default class SeekbarManager {
	static update(value: number) {
		const percent = `${value * 100}%`;

		seekbarProgress.style.width = percent;
		seekbarGrabber.style.left = percent;
	}
}
