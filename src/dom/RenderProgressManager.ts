const renderContainer = document.getElementById("render-container")! as HTMLDivElement;
const renderProgress = document.getElementById("render-bar-progress")! as HTMLDivElement;



export default class RenderProgressManager {
	static show() {
		renderContainer.classList.remove("hide");

	}

	static hide() {
		renderContainer.classList.add("hide");
		renderProgress.style.width = "0";
	}

	static update(value: number) {
		const width = `${value * 100}%`;

		renderProgress.style.width = width;

		if(value === 1) {
			this.hide();
		}
	}
}
