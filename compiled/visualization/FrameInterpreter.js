import BackgroundAnimationState from "./BackgroundAnimationState.js";
import { clamp, randomBetween } from "../util.js";
export default class FrameInterpreter {
    static framesPerBeat;
    static rampFrames;
    static sustainFrames;
    static fadeFrames;
    static fadeSustain;
    static maxLightness;
    static rampLightness;
    static fadeLightness;
    static lightness = 0;
    static hue = 0;
    static queuedBgAnimation = undefined;
    static init(beatData) {
        this.framesPerBeat = Math.round(60 * beatData.beatDistance);
        // use queued anim if it exists; otherwise fetch default
        this.calculateFrameTimes(this.queuedBgAnimation ?? BackgroundAnimationState.get());
    }
    static interpret(frame) {
        let rampFrame = this.framesPerBeat - frame;
        // Color ramping
        if (rampFrame === this.rampFrames) {
            this.hue = randomBetween(1, 360);
        }
        if (rampFrame <= this.rampFrames) {
            this.lightness += this.rampLightness;
        }
        // Color sustaining
        if (frame <= this.sustainFrames) { // ramp is included in 0
            this.lightness = this.lightness;
            // yes this is redundant but just for clarity
        }
        if (frame > this.sustainFrames && frame <= this.fadeSustain) {
            this.lightness -= this.fadeLightness;
        }
        if (frame > this.fadeSustain && frame < this.framesPerBeat && !(rampFrame <= this.rampFrames)) {
            this.lightness = 0;
        }
        this.lightness = (this.lightness < 0) ? 0 : this.lightness;
        this.lightness = (this.lightness > 100) ? 100 : this.lightness;
        this.lightness = clamp(this.lightness, 0, 100);
        return {
            hue: this.hue,
            lightness: this.lightness
        };
    }
    static calculateFrameTimes(backgroundAnimation) {
        if (!this.framesPerBeat) {
            this.queuedBgAnimation = backgroundAnimation;
            return;
        }
        this.rampFrames = Math.round(backgroundAnimation.rampUp * this.framesPerBeat);
        this.sustainFrames = Math.round(backgroundAnimation.sustain * this.framesPerBeat);
        this.fadeFrames = Math.round(backgroundAnimation.fadeOut * this.framesPerBeat);
        this.fadeSustain = this.sustainFrames + this.fadeFrames;
        this.maxLightness = backgroundAnimation.maxLightness;
        this.rampLightness = this.maxLightness / this.rampFrames;
        this.fadeLightness = this.maxLightness / this.fadeFrames;
    }
}
