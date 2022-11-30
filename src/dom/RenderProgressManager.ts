import {getId} from "../util.js";



type RenderStatus = "DECODE" | "RENDER";



const renderModal = getId<HTMLDivElement>("render-modal");
const renderProgress = getId<HTMLDivElement>("render-bar-progress");
const renderLabel = getId<HTMLDivElement>("render-label");



export default class RenderProgressManager {
	static show() {
		renderModal.classList.remove("hide");
		renderProgress.style.width = "0";
	}

	static set status(text: RenderStatus) {
		if(text === "DECODE") renderLabel.textContent = "Decoding...";
		if(text === "RENDER") renderLabel.textContent = "Rendering...";
	}

	static update(value: number) {
		const width = `${value * 100}%`;

		renderProgress.style.width = width;

		if(value === 1) {
			// save the binding, just call the class itself lmao
			RenderProgressManager.hide();
		}
	}

	static hide() {
		renderModal.classList.add("hide");
	}
}
