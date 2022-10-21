import addAnimationInputListeners from "./animationInput.js";
import addFrequencyInputListener from "./frequencyInput.js";
import { id } from "../util.js";
import { stopVisualization, visualizeAudioFile } from "../visualizeAudioFile.js";
const canvas = id("canvas");
const ctx = canvas.getContext("2d");
const sidebar = id("sidebar");
const uploadButton = id("upload-button");
const fileInput = id("file-input");
let firstRun = true;
export default function initDOM() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const { height } = canvas;
    ctx.transform(1, 0, 0, -1, 0, height);
    sidebar.addEventListener("click", () => sidebar.classList.add("show"));
    canvas.addEventListener("click", () => sidebar.classList.remove("show"));
    uploadButton.addEventListener("click", () => fileInput.click());
    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        if (!file || !file.type.includes("audio/"))
            return;
        if (!firstRun) {
            stopVisualization();
        }
        firstRun = false;
        sidebar.classList.remove("show");
        visualizeAudioFile(file, ctx);
    });
    addAnimationInputListeners();
    addFrequencyInputListener();
}
