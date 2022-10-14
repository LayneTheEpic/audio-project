export default class FrameInterpreter {
    static framesPerBeat;
    static fadeFrames;
    static rampFrames;
    static sustainFrames;
    static maxLightness;
    static lightness;
    static hue;
    static init(backgroundAnimation, beatData) {
        // this.backgroundAnimation = backgroundAnimation;
        // this.beaData = beatData;
        this.framesPerBeat = beatData.beatDistance;
        this.fadeFrames = Math.round(backgroundAnimation.fadeOut * beatData.beatDistance);
        this.rampFrames = Math.round(backgroundAnimation.rampUp * beatData.beatDistance);
        this.sustainFrames = Math.round(backgroundAnimation.sustain * beatData.beatDistance);
        this.maxLightness = backgroundAnimation.maxLightness;
    }
    static interpret(frame) {
        // if(frame + this.fadeFrames > this.framesPerBeat) {
        //
        // }
        // uhfsjfdhfgkjdfhkgj this is so draining
        return {
            hue: 0,
            lightness: 0
        };
    }
}
