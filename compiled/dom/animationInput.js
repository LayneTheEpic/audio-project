import { id } from "../util.js";
const fadeInput = id("animation-fade-input");
const rampInput = id("animation-ramp-input");
const sustainInput = id("animation-sustain-input");
const lightnessInput = id("animation-lightness-input");
const backgroundAnimation = {
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
    if (isNaN(fadeValue)) {
    }
}
