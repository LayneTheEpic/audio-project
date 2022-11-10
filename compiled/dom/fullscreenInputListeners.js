import BackgroundAnimationState from "../visualization/BackgroundAnimationState.js";
import FrameInterpreter from "../visualization/FrameInterpreter.js";
import { getClass, getId } from "../util.js";
import InputModalManager from "./InputModalManager.js";
import WaveformAnimator from "../visualization/WaveformAnimator.js";
const bgInputs = getClass("bg-input");
const frequencyInput = getId("frequency-input");
const frequencyComputed = getId("frequency-computed");
export default function addFullscreenInputListeners() {
    for (const input of bgInputs) {
        const dataset = input.dataset;
        const span = input.children[0].children[0];
        span.addEventListener("click", async () => {
            const value = await InputModalManager.prompt(dataset);
            span.textContent = `${value}${dataset.unit ?? ""}`;
            const animation = BackgroundAnimationState.construct(dataset.for, value);
            FrameInterpreter.calculateFrameTimes(animation);
        });
    }
    const frequencyDataset = frequencyInput.dataset;
    const span = frequencyInput.children[0].children[0];
    span.addEventListener("click", async () => {
        const value = await InputModalManager.prompt(frequencyDataset);
        span.textContent = `${value}${frequencyDataset.unit ?? ""}`;
        const computed = 2 ** value;
        WaveformAnimator.setFrequencyCount(computed);
        frequencyComputed.innerText = `(${computed})`;
    });
}
