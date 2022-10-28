import { getId } from "../util.js";
import WaveformAnimator from "../visualization/WaveformAnimator.js";
const frequencyInput = getId("frequency-input");
const frequenciesLabel = getId("frequency-computed");
export default function addFrequencyInputListener() {
    frequencyInput.addEventListener("change", frequencyChangeListener);
}
function frequencyChangeListener() {
    const value = parseFloat(frequencyInput.value);
    frequenciesLabel.classList.remove("error");
    if (isNaN(value)) {
        frequenciesLabel.innerText = "(Error: Not valid!)";
        frequenciesLabel.classList.add("error");
        return;
    }
    if (Math.floor(value) !== value) {
        frequenciesLabel.innerText = "(Error: Not an integer!)";
        frequenciesLabel.classList.add("error");
        return;
    }
    const computedFrequencies = 2 ** value;
    if (computedFrequencies > 16384) {
        frequenciesLabel.innerText = "(Error: >14!)";
        frequenciesLabel.classList.add("error");
        return;
    }
    if (computedFrequencies < 16) {
        frequenciesLabel.innerText = "(Error: <4!)";
        frequenciesLabel.classList.add("error");
        return;
    }
    frequenciesLabel.innerText = `(${computedFrequencies})`;
    WaveformAnimator.setFrequencyCount(computedFrequencies);
}
