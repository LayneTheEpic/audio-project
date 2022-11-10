const defaultBgAnimation = {
    fadeOut: 0.35,
    rampUp: 0.05,
    sustain: 0.1,
    maxLightness: 20
};
export default class BackgroundAnimationState {
    static internalState = defaultBgAnimation;
    static construct(valueType, value) {
        // eventually i need to change the bganim datatype to be less verbose so I can use this.internalstate[prop]
        if (valueType === "ramp") {
            this.internalState.rampUp = value / 100;
        }
        if (valueType === "fade") {
            this.internalState.fadeOut = value / 100;
        }
        if (valueType === "sustain") {
            this.internalState.sustain = value / 100;
        }
        if (valueType === "lightness") {
            this.internalState.maxLightness = value;
        }
        return this.internalState;
    }
    static get() {
        return this.internalState;
    }
}
