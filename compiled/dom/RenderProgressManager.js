const renderContainer = document.getElementById("render-container");
const renderProgress = document.getElementById("render-bar-progress");
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
            this.hide();
        }
    }
}
