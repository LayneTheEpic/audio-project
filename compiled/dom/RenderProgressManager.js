import { getId } from "../util.js";
const renderModal = getId("render-modal");
const renderProgress = getId("render-bar-progress");
const renderLabel = getId("render-label");
export default class RenderProgressManager {
    static show() {
        renderModal.classList.remove("hide");
        renderProgress.style.width = "0";
    }
    static statusDecode() {
        renderLabel.innerText = "Decoding...";
    }
    static statusRender() {
        renderLabel.innerText = "Rendering...";
    }
    static update(value) {
        const width = `${value * 100}%`;
        renderProgress.style.width = width;
        if (value === 1) {
            // save the binding, just call the class itself
            RenderProgressManager.hide();
        }
    }
    static hide() {
        renderModal.classList.add("hide");
    }
}
