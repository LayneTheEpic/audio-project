import AudioPlayer from "../AudioPlayer.js";
import {clamp, getId} from "../util.js";



const seekbarBar = getId<HTMLDivElement>("seekbar-bar");
const seekbarProgress = getId<HTMLDivElement>("seekbar-progress");
const seekbarGrabber = getId<HTMLDivElement>("seekbar-grabber");



export default class SeekbarManager {
	private static seeking: boolean;

	static init() {
		seekbarGrabber.addEventListener("dragstart", () => this.start());
		seekbarGrabber.addEventListener("drag", (e) => this.move(e));
		seekbarGrabber.addEventListener("dragend", () => this.stop());
	}

	private static start() {
		this.seeking = true;
	}

	private static move(e: DragEvent) {
		const {width} = seekbarBar.getBoundingClientRect();
		const pos = e.clientX;


		const percent = clamp(pos / width, 0, 1);

		this.update(percent);

		AudioPlayer.seekTo(percent);
	}

	private static stop() {
		this.seeking = false;
	}

	static requestUpdate(value: number) {
		if(this.seeking) return;
		this.update(value);
	}

	private static update(value: number) {
		const percent = `${value * 100}%`;

		seekbarProgress.style.width = percent;
		seekbarGrabber.style.left = percent;
	}
}
