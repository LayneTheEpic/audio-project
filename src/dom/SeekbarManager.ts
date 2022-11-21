import {getId} from "../util.js";



const seekbarProgress = getId<HTMLDivElement>("seekbar-progress");
const seekbarGrabber = getId<HTMLDivElement>("seekbar-grabber");



export default class SeekbarManager {
	static init() {
		seekbarGrabber.addEventListener("dragstart", (e) => this.start(e));
		seekbarGrabber.addEventListener("drag", (e) => this.move(e));
		seekbarGrabber.addEventListener("dragend", (e) => this.stop(e));
	}

	private static start(e: DragEvent) {
		console.log(e)
	}

	private static move(e: DragEvent) {
		console.log(e)
	}

	private static stop(e: DragEvent) {
		console.log(e)
	}

	static update(value: number) {
		const percent = `${value * 100}%`;

		seekbarProgress.style.width = percent;
		seekbarGrabber.style.left = percent;
	}
}
