import { getId } from "../util.js";
// const seekbarContainer = getId<HTMLDivElement>("seekbar-container");
const seekbarProgress = getId("seekbar-progress");
const seekbarGrabber = getId("seekbar-grabber");
export default class SeekbarManager {
    static update(value) {
        const percent = `${value * 100}%`;
        seekbarProgress.style.width = percent;
        seekbarGrabber.style.left = percent;
    }
}
