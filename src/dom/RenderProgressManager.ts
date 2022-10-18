import {id} from "../util.js";



const renderContainer = id<HTMLDivElement>("render-modal");
const renderProgress = id<HTMLDivElement>("render-bar-progress");
const renderLabel = id<HTMLDivElement>("render-label");



export default class RenderProgressManager {
	static show() {
		renderLabel.innerText = "Decoding...";
		renderProgress.style.width = "0";
		renderContainer.classList.remove("hide");
	}

	static awaitRender() {
		renderLabel.innerText = "Rendering...";
	}

	static update(value: number) {
		const width = `${value * 100}%`;

		renderProgress.style.width = width;

		if(value === 1) {
			// save the binding, just call the class itself
			RenderProgressManager.hide();
		}
	}

	static hide() {
		renderContainer.classList.add("hide");
	}
}
