import AudioPlayer from "../AudioPlayer.js";
import {clamp, getId} from "../util.js";



const seekbarBar = getId<HTMLDivElement>("seekbar-bar");
const seekbarProgress = getId<HTMLDivElement>("seekbar-progress");
const seekbarGrabber = getId<HTMLDivElement>("seekbar-grabber");

const transparentImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAJnKAACZygHjkaQiAAAADUlEQVQImWP4//8/AwAI/AL+hc2rNAAAAABJRU5ErkJggg==";



export default class SeekbarManager {
	private static seeking: boolean;
	private static dragImage: HTMLImageElement;
	private static seekedValue: number = 0;
	private static recentValue: number = 0;

	private static barRect: DOMRect;

	static init() {
		seekbarGrabber.addEventListener("dragstart", (e) => this.start(e));
		seekbarGrabber.addEventListener("drag", (e) => this.move(e));
		seekbarGrabber.addEventListener("dragend", () => this.stop());

		this.dragImage = new Image(1, 1);
		this.dragImage.src = transparentImage;
	}

	private static start(e: DragEvent) {
		this.seeking = true;
		this.barRect = seekbarBar.getBoundingClientRect();

		e.dataTransfer!.effectAllowed = "move";
		e.dataTransfer!.setDragImage(this.dragImage, 0, 0);
	}

	private static move(e: DragEvent) {
		const pos = e.clientX - this.barRect.left;

		const value = clamp(pos / this.barRect.width, 0, 1);

		// whenever I let go of the dragger the value immediately jumps to 0
		// until I figure out how to fix it, add a buffer of one value
		this.seekedValue = this.recentValue;
		this.recentValue = value;

		this.update(this.seekedValue);
	}

	private static stop() {
		this.seeking = false;
		AudioPlayer.seekTo(this.seekedValue);
	}

	static requestUpdate(value: number) {
		if(this.seeking) return;
		this.update(value);
	}

	private static update(value: number) {
		seekbarBar.style.setProperty("--value", `${value * 100}%`);
	}
}
