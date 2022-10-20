import {id} from "../util.js";

import type {BackgroundAnimation} from "../types";



const fadeInput = id<HTMLInputElement>("animation-fade-input");
const rampInput = id<HTMLInputElement>("animation-ramp-input");
const sustainInput = id<HTMLInputElement>("animation-sustain-input");
const lightnessInput = id<HTMLInputElement>("animation-lightness-input");



const backgroundAnimation: BackgroundAnimation = {
	fadeOut: 0.35,
	rampUp: 0.05,
	sustain: 0.1,

	maxLightness: 20
};



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


	if(isNaN(fadeValue)) {

	}
}
