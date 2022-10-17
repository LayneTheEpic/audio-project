export default class FrameInterpreter {
    static framesPerBeat;
    static fadeFrames;
    static rampFrames;
    static sustainFrames;
    static maxLightness;
    static lightness = 0;
    static hue = 0;
    static init(backgroundAnimation, beatData) {
        // this.backgroundAnimation = backgroundAnimation;
        // this.beaData = beatData;
        this.framesPerBeat = Math.round(beatData.beatDistance);
        this.fadeFrames = Math.round(backgroundAnimation.fadeOut * beatData.beatDistance);
        this.rampFrames = Math.round(backgroundAnimation.rampUp * beatData.beatDistance);
        this.sustainFrames = Math.round(backgroundAnimation.sustain * beatData.beatDistance);
        this.maxLightness = backgroundAnimation.maxLightness;
    }
    static interpret(frame) {
        // if(frame + this.fadeFrames > this.framesPerBeat) {
        // }
        let rampFrames = frame - this.framesPerBeat;
        // console.log(rampFrames)
        console.log(this.rampFrames); // why is this 0
        if (rampFrames > 0 && rampFrames <= this.rampFrames) {
            // console.log(rampFrames);
        }
        // uhfsjfdhfgkjdfhkgj this is so draining
        return {
            hue: 0,
            lightness: 0
        };
    }
}
