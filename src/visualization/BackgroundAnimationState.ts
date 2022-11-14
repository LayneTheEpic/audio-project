import type {AnimationProperty, BackgroundAnimation} from "../types.js";



const defaultBgAnimation = {
	rampUp: 0.10,
	sustain: 0.05,
	fadeOut: 0.35,

	maxLightness: 20
};



export default class BackgroundAnimationState {
	static state: BackgroundAnimation = defaultBgAnimation;

	static construct(valueType: AnimationProperty, value: number) {
		// eventually i need to change the bganim datatype to be less verbose so I can use this.internalstate[prop]
		if(valueType === "ramp") {
			this.state.rampUp = value / 100;
		}

		if(valueType === "fade") {
			this.state.fadeOut = value / 100;
		}

		if(valueType === "sustain") {
			this.state.sustain = value / 100;
		}

		if(valueType === "lightness") {
			this.state.maxLightness = value;
		}

		return this.state;
	}
}
