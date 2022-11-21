import BackgroundAnimationState from "../visualization/BackgroundAnimationState.js";
import FrameInterpreter from "../visualization/FrameInterpreter.js";
import {getClass, getId} from "../util.js";
import InputModalManager from "./InputModalManager.js";
import WaveformAnimator from "../visualization/WaveformAnimator.js";

import type {AnimationProperty, InputDataset} from "../types.js";



const bgInputs = getClass<HTMLDivElement>("bg-input");

const frequencyInput = getId<HTMLDivElement>("frequency-input");
const frequencyComputed = getId<HTMLParagraphElement>("frequency-computed");



// TODO: make this less terrible

export default function addFullscreenInputListeners() {
	for(const bgInput of bgInputs) {
		const bgDataset = bgInput.dataset as InputDataset;
		const bgSpan = bgInput.children[0].children[0] as HTMLSpanElement;

		bgSpan.addEventListener("click", async () => {
			const value = await InputModalManager.prompt(bgDataset) as number;
			if(isNaN(value)) {
				return;
			}

			bgSpan.textContent = `${value}${bgDataset.unit ?? ""}`;

			const animation = BackgroundAnimationState.construct(<AnimationProperty>bgDataset.for, <number>value);

			FrameInterpreter.calculateFrameTimes(animation);
		});
	}

	const freqDataset = frequencyInput.dataset as InputDataset;
	const freqSpan = frequencyInput.children[0].children[0] as HTMLSpanElement;

	freqSpan.addEventListener("click", async () => {
		const value = await InputModalManager.prompt(freqDataset) as number;
		if(isNaN(value)) {
			return;
		}

		freqSpan.textContent = `${value}${freqDataset.unit || ""}`;

		const computed = 2 ** value;

		WaveformAnimator.setFrequencyCount(computed);
		frequencyComputed.innerText = `(${computed})`;
	});
}
