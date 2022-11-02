import FrameInterpreter from "../visualization/FrameInterpreter.js";
import {getId} from "../util.js";



const fadeInput = getId<HTMLInputElement>("animation-fade-input");
const rampInput = getId<HTMLInputElement>("animation-ramp-input");
const sustainInput = getId<HTMLInputElement>("animation-sustain-input");
const lightnessInput = getId<HTMLInputElement>("animation-lightness-input");

const animationLabel = getId<HTMLParagraphElement>("animation-error");



export default function addAnimationInputListeners() {
	fadeInput.addEventListener("change", animationChangeListener);
	rampInput.addEventListener("change", animationChangeListener);
	sustainInput.addEventListener("change", animationChangeListener);
	lightnessInput.addEventListener("change", animationChangeListener);
}



function animationChangeListener() {
	const fadeValue = parseFloat(fadeInput.value);
	const rampValue = parseFloat(rampInput.value);
	const sustainValue = parseFloat(sustainInput.value);
	const lightnessValue = parseFloat(lightnessInput.value);


	if(isNaN(fadeValue) || isNaN(rampValue) || isNaN(sustainValue) || isNaN(lightnessValue)) {
		animationLabel.innerText = "(Error: Not valid!)";
		return;
	}

	if(fadeValue > 100 || rampValue > 100 || sustainValue > 100 || lightnessValue > 100) {
		animationLabel.innerText = "(Error: >100!)"
		return;
	}

	if(fadeValue < 0 || rampValue < 0 || sustainValue < 0 || lightnessValue < 0) {
		animationLabel.innerText = "(Error: <0!)";
		return;
	}


	if(fadeValue + rampValue + sustainValue > 100) {
		animationLabel.innerText = "(Error: Frame times >100%!)";
		return;
	}


	animationLabel.innerHTML = "&nbsp;";
	FrameInterpreter.calculateFrameTimes({
		fadeOut: fadeValue / 100,
		rampUp: rampValue / 100,
		sustain: sustainValue / 100,
		maxLightness: lightnessValue
	});
}
