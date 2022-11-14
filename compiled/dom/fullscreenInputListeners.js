import BackgroundAnimationState from "../visualization/BackgroundAnimationState.js";
import FrameInterpreter from "../visualization/FrameInterpreter.js";
import { getClass, getId } from "../util.js";
import InputModalManager from "./InputModalManager.js";
import WaveformAnimator from "../visualization/WaveformAnimator.js";
const bgInputs = getClass("bg-input");
const frequencyInput = getId("frequency-input");
const frequencyComputed = getId("frequency-computed");
export default function addFullscreenInputListeners() {
    for (const bgInput of bgInputs) {
        const bgDataset = bgInput.dataset;
        const bgSpan = bgInput.children[0].children[0];
        bgSpan.addEventListener("click", async () => {
            const value = await InputModalManager.prompt(bgDataset);
            if (isNaN(value)) {
                return;
            }
            bgSpan.textContent = `${value}${bgDataset.unit ?? ""}`;
            const animation = BackgroundAnimationState.construct(bgDataset.for, value);
            FrameInterpreter.calculateFrameTimes(animation);
        });
    }
    const freqDataset = frequencyInput.dataset;
    const freqSpan = frequencyInput.children[0].children[0];
    freqSpan.addEventListener("click", async () => {
        const value = await InputModalManager.prompt(freqDataset);
        if (isNaN(value)) {
            return;
        }
        freqSpan.textContent = `${value}${freqDataset.unit ?? ""}`;
        const computed = 2 ** value;
        WaveformAnimator.setFrequencyCount(computed);
        frequencyComputed.innerText = `(${computed})`;
    });
}
