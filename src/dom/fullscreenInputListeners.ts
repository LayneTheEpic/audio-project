import BackgroundAnimationState from "../visualization/BackgroundAnimationState.js";
import FrameInterpreter from "../visualization/FrameInterpreter.js";
import {getClass, getId} from "../util.js";
import InputModalManager from "./InputModalManager.js";
import WaveformAnimator from "../visualization/WaveformAnimator.js";

import type {AnimationProperty, InputDataset} from "../types.js";



const bgInputs = getClass<HTMLDivElement>("bg-input");

const frequencyInput = getId<HTMLDivElement>("frequency-input");
const frequencyComputed = getId<HTMLParagraphElement>("frequency-computed");


export default function addFullscreenInputListeners() {
	for(const input of bgInputs) {
		const dataset = input.dataset as InputDataset;
		const span = input.children[0]!.children[0]! as HTMLSpanElement;

		span.addEventListener("click", async () => {
			const value = await InputModalManager.prompt(dataset);
			span.textContent = `${value}${dataset.unit ?? ""}`;

			const animation = BackgroundAnimationState.construct(<AnimationProperty>dataset.for, <number>value);

			FrameInterpreter.calculateFrameTimes(animation);
		});
	}

	const frequencyDataset = frequencyInput.dataset as InputDataset;
	const span = frequencyInput.children[0]!.children[0!] as HTMLSpanElement;

	span.addEventListener("click", async () => {
		const value = await InputModalManager.prompt(frequencyDataset) as number;
		span.textContent = `${value}${frequencyDataset.unit ?? ""}`;

		const computed = 2 ** value;

		WaveformAnimator.setFrequencyCount(computed);
		frequencyComputed.innerText = `(${computed})`;
	});
}
