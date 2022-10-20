import { randomBetween } from "../util.js";
const defaultBgAnimation = {
    fadeOut: 0.35,
    rampUp: 0.05,
    sustain: 0.1,
    maxLightness: 20
};
export default class FrameInterpreter {
    static framesPerBeat;
    static rampFrames;
    static sustainFrames;
    static fadeFrames;
    static sustainTime;
    static maxLightness;
    static rampLightness;
    static fadeLightness;
    static lightness = 0;
    static hue = 0;
    static queuedBgAnimation = null;
    static init(beatData) {
        this.framesPerBeat = Math.round(60 * beatData.beatDistance);
        this.calculateFrameTimes(this.queuedBgAnimation ?? defaultBgAnimation);
    }
    static interpret(frame) {
        console.log(frame);
        let rampFrame = this.framesPerBeat - frame;
        // Color ramping
        if (rampFrame === this.rampFrames) {
            this.hue = randomBetween(1, 360);
        }
        if (rampFrame <= this.rampFrames) {
            this.lightness += this.rampLightness;
        }
        // Color sustaining
        if (frame <= this.sustainFrames) {
            // nothing; hold value
            this.lightness = this.lightness;
            // yes this is redundant but just for clarity
        }
        // Color fading
        if (frame > this.sustainFrames && frame <= this.sustainTime) {
            this.lightness -= this.fadeLightness;
        }
        // sometimes due to weird frame things it doesn't fall all the way down
        if (frame > this.sustainTime && rampFrame > this.rampFrames) {
            this.lightness = 0;
        }
        this.lightness = (this.lightness < 0) ? 0 : this.lightness;
        this.lightness = (this.lightness > 100) ? 100 : this.lightness;
        // uhfsjfdhfgkjdfhkgj this is so draining
        return {
            hue: this.hue,
            lightness: this.lightness
        };
    }
    static calculateFrameTimes(backgroundAnimation) {
        this.rampFrames = Math.round(backgroundAnimation.rampUp * this.framesPerBeat);
        this.sustainFrames = Math.round(backgroundAnimation.sustain * this.framesPerBeat);
        this.fadeFrames = Math.round(backgroundAnimation.fadeOut * this.framesPerBeat);
        this.sustainTime = this.sustainFrames + this.fadeFrames;
        this.maxLightness = backgroundAnimation.maxLightness;
        this.rampLightness = this.maxLightness / this.rampFrames;
        this.fadeLightness = this.maxLightness / this.fadeFrames;
    }
}
