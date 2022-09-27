import RenderProgressManager from "./RenderProgressManager";
import { stopVisualization, visualizeAudioFile } from "../visualizeAudioFile.js";
import addFrequencyInputListener from "./frequencyInput.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const sidebar = document.getElementById("sidebar");
const uploadButton = document.getElementById("upload-button");
const fileInput = document.getElementById("file-input");
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
    uploadButton.addEventListener("click", () => { fileInput.click(); });
    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        if (!file || !file.type.includes("audio/"))
            return;
        stopVisualization();
        sidebar.classList.remove("show");
        RenderProgressManager.show();
        visualizeAudioFile(file, ctx);
    });
    addFrequencyInputListener();
}
