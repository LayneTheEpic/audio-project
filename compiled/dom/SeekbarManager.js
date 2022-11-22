import AudioPlayer from "../AudioPlayer.js";
import { clamp, getId } from "../util.js";
const seekbarBar = getId("seekbar-bar");
const seekbarProgress = getId("seekbar-progress");
const seekbarGrabber = getId("seekbar-grabber");
export default class SeekbarManager {
    static seeking;
    static init() {
        seekbarGrabber.addEventListener("dragstart", () => this.start());
        seekbarGrabber.addEventListener("drag", (e) => this.move(e));
        seekbarGrabber.addEventListener("dragend", () => this.stop());
    }
    static start() {
        this.seeking = true;
    }
    static move(e) {
        const { width } = seekbarBar.getBoundingClientRect();
        const pos = e.clientX;
        const percent = clamp(pos / width, 0, 1);
        this.update(percent);
        AudioPlayer.seekTo(percent);
    }
    static stop() {
        this.seeking = false;
    }
    static requestUpdate(value) {
        if (this.seeking)
            return;
        this.update(value);
    }
    static update(value) {
        const percent = `${value * 100}%`;
        seekbarProgress.style.width = percent;
        seekbarGrabber.style.left = percent;
    }
}
