import AudioPlayer from "../AudioPlayer.js";
import { clamp, getId } from "../util.js";
const seekbarBar = getId("seekbar-bar");
const seekbarProgress = getId("seekbar-progress");
const seekbarGrabber = getId("seekbar-grabber");
const transparentImage = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAJnKAACZygHjkaQiAAAADUlEQVQImWP4//8/AwAI/AL+hc2rNAAAAABJRU5ErkJggg==";
export default class SeekbarManager {
    static seeking;
    static dragImage;
    static seekedValue = 0;
    static recentValue = 0;
    static init() {
        seekbarGrabber.addEventListener("dragstart", (e) => this.start(e));
        seekbarGrabber.addEventListener("drag", (e) => this.move(e));
        seekbarGrabber.addEventListener("dragend", () => this.stop());
        this.dragImage = new Image(1, 1);
        this.dragImage.src = transparentImage;
    }
    static start(e) {
        this.seeking = true;
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setDragImage(this.dragImage, 0, 0);
    }
    static move(e) {
        const { left, width } = seekbarBar.getBoundingClientRect();
        const pos = e.clientX - left;
        const value = clamp(pos / width, 0, 1);
        // whenever I let go of the dragger the value immediately jumps to 0
        // until I figure out how to fix it, add a buffer of one value
        this.seekedValue = this.recentValue;
        this.recentValue = value;
        this.update(this.seekedValue);
    }
    static stop() {
        this.seeking = false;
        AudioPlayer.seekTo(this.seekedValue);
    }
    static requestUpdate(value) {
        if (this.seeking)
            return;
        this.update(value);
    }
    static update(value) {
        // value || 0 handles NaN
        seekbarBar.style.setProperty("--value", `${(value || 0) * 100}%`);
    }
}
