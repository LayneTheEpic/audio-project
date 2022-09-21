import {changeFrequencyCount} from "../visualization/visualizeAudio.js";



const frequencyInput = document.getElementById("frequency-input")! as HTMLInputElement;
const frequenciesLabel = document.getElementById("computed-frequencies")! as HTMLSpanElement;



export default function addFrequencyInputListener() {
	frequencyInput.addEventListener("change", () => {
		const value = parseFloat(frequencyInput.value);


		if(isNaN(value) ||
			Math.floor(value) !== value
		) {
			frequenciesLabel.innerText = "(Error: Not valid!)";
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


		changeFrequencyCount(computedFrequencies);
	});
}
