const renderContainer = document.getElementById("render-container");
const renderProgress = document.getElementById("render-bar-progress");
export function updateProgressMeter(value) {
    const width = `${value * 100}%`;
    renderProgress.style.width = width;
    if (value === 1) {
        renderContainer.classList.add("hide");
    }
}
export function showRenderProgress() {
    renderContainer.classList.remove("hide");
    renderProgress.style.width = "0";
}
