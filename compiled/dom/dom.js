import addFrequencyInputListener from "./frequencyInput.js";
import BackgroundAnimationState from "../visualization/BackgroundAnimationState.js";
import FrameInterpreter from "../visualization/FrameInterpreter.js";
import { getClass, getId } from "../util.js";
import InputModalManager from "./InputModalManager.js";
import { stopVisualization, visualizeAudioFile } from "../visualizeAudioFile.js";
const canvas = getId("canvas");
const ctx = canvas.getContext("2d");
const sidebar = getId("sidebar");
const uploadButton = getId("upload-button");
const fileInput = getId("file-input");
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
    addFrequencyInputListener();
    addFullscreenInputListeners();
}
const fullScreenInputs = getClass("fullscreen-input");
function addFullscreenInputListeners() {
    for (const input of fullScreenInputs) {
        const dataset = input.dataset;
        const span = input.children[0].children[0];
        span.addEventListener("click", async () => {
            const value = await InputModalManager.prompt(dataset);
            span.textContent = `${value}${dataset.unit || ""}`;
            const animation = BackgroundAnimationState.construct(dataset.for, value);
            FrameInterpreter.calculateFrameTimes(animation);
        });
    }
}
