import { stopVisualization, visualizeAudioFile } from "./visualizeAudioFile.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const sidebar = document.getElementById("sidebar");
const fileButton = document.getElementById("fileButton");
const input = document.getElementById("fileInput");
const renderContainer = document.getElementById("render-container");
const renderProgress = document.getElementById("render-bar-progress");
export function initDOM() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const { height } = canvas;
    ctx.transform(1, 0, 0, -1, 0, height);
    sidebar.addEventListener("click", () => {
        sidebar.classList.add("show");
    });
    canvas.addEventListener("click", () => {
        sidebar.classList.remove("show");
    });
    fileButton.addEventListener("click", () => { input.click(); });
    input.addEventListener("change", () => {
        const file = input.files[0];
        if (!file || !file.type.includes("audio/"))
            return;
        stopVisualization();
        sidebar.classList.remove("show");
        renderContainer.classList.remove("hide");
        renderProgress.style.width = "0";
        visualizeAudioFile(file, ctx);
    });
}
export function updateProgressMeter(value) {
    const width = `${value * 100}%`;
    renderProgress.style.width = width;
    if (value === 1) {
        renderContainer.classList.add("hide");
    }
}
