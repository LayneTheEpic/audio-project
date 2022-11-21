import { getId } from "../util.js";
const seekbarProgress = getId("seekbar-progress");
const seekbarGrabber = getId("seekbar-grabber");
export default class SeekbarManager {
    static init() {
        seekbarGrabber.addEventListener("dragstart", (e) => this.start(e));
        seekbarGrabber.addEventListener("drag", (e) => this.move(e));
        seekbarGrabber.addEventListener("dragend", (e) => this.stop(e));
    }
    static start(e) {
        console.log(e);
    }
    static move(e) {
        console.log(e);
    }
    static stop(e) {
        console.log(e);
    }
    static update(value) {
        const percent = `${value * 100}%`;
        seekbarProgress.style.width = percent;
        seekbarGrabber.style.left = percent;
    }
}
