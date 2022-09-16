import { stopVisualization, visualizeAudioFile } from "./visualizeAudioFile.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const sidebar = document.getElementById("sidebar");
const fileButton = document.getElementById("fileButton");
const input = document.getElementById("fileInput");
export default function initDOM() {
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
        visualizeAudioFile(file, ctx);
    });
}
