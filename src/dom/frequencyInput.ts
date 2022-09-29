import WaveformAnimator from "../visualization/WaveformAnimator.js";
import {id} from "../util.js";



const frequencyInput = id<HTMLInputElement>("frequency-input");
const frequenciesLabel = id<HTMLSpanElement>("computed-frequencies");



export default function addFrequencyInputListener() {
	frequencyInput.addEventListener("change", frequencyChangeListener);
}



function frequencyChangeListener() {
	const value = parseFloat(frequencyInput.value);


	if(isNaN(value)) {
		frequenciesLabel.innerText = "(Error: Not valid!)";
		return;
	}

	if(Math.floor(value) !== value) {
		frequenciesLabel.innerText = "(Error: Not an integer!)";
		return;
	}


	const computedFrequencies = 2 ** value;


	if(computedFrequencies > 16384) {
		frequenciesLabel.innerText = "(Error: >14!)";
		return;
	}

	if(computedFrequencies < 16) {
		frequenciesLabel.innerText = "(Error: <4!)";
		return;
	}


	frequenciesLabel.innerText = `(${computedFrequencies})`;


	WaveformAnimator.changeFrequencyCount(computedFrequencies);
}
