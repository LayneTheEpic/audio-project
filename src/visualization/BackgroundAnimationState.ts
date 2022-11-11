import type {AnimationProperty, BackgroundAnimation} from "../types.js";



const defaultBgAnimation = {
	rampUp: 0.10,
	sustain: 0.05,
	fadeOut: 0.35,

	maxLightness: 20
};



export default class BackgroundAnimationState {
	static internalState: BackgroundAnimation = defaultBgAnimation;

	static construct(valueType: AnimationProperty, value: number) {
		// eventually i need to change the bganim datatype to be less verbose so I can use this.internalstate[prop]
		if(valueType === "ramp") {
			this.internalState.rampUp = value / 100;
		}

		if(valueType === "fade") {
			this.internalState.fadeOut = value / 100;
		}

		if(valueType === "sustain") {
			this.internalState.sustain = value / 100;
		}

		if(valueType === "lightness") {
			this.internalState.maxLightness = value;
		}

		return this.internalState;
	}

	static get() {
		return this.internalState;
	}
}
