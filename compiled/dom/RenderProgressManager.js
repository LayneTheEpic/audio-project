import { id } from "../util.js";
const renderContainer = id("render-modal");
const renderProgress = id("render-bar-progress");
export default class RenderProgressManager {
    static show() {
        renderContainer.classList.remove("hide");
    }
    static hide() {
        renderContainer.classList.add("hide");
        renderProgress.style.width = "0";
    }
    static update(value) {
        const width = `${value * 100}%`;
        renderProgress.style.width = width;
        if (value === 1) {
            // save the binding, just call the class itself
            RenderProgressManager.hide();
        }
    }
}
