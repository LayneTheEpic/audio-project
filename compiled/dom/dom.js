import addFullscreenInputListeners from "./fullscreenInputListeners.js";
import { getId } from "../util.js";
import { stopVisualization, visualizeAudioFile } from "../visualizeAudioFile.js";
import SeekbarManager from "./SeekbarManager.js";
const canvas = getId("canvas");
const ctx = canvas.getContext("2d");
const sidebar = getId("sidebar");
const uploadButton = getId("upload-button");
const fileInput = getId("file-input");
let firstRun = true;
// TODO: please clean this up
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
    addFullscreenInputListeners();
    SeekbarManager.init();
}
