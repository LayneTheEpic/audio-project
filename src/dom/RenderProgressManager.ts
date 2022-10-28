import {getId} from "../util.js";



const renderModal = getId<HTMLDivElement>("render-modal");
const renderProgress = getId<HTMLDivElement>("render-bar-progress");
const renderLabel = getId<HTMLDivElement>("render-label");



export default class RenderProgressManager {
	static show() {
		renderModal.classList.remove("hide");
		renderLabel.innerText = "Decoding...";
		renderProgress.style.width = "0";
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
		renderModal.classList.add("hide");
	}
}
