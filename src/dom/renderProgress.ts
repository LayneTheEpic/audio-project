const renderContainer = document.getElementById("render-container")! as HTMLDivElement;
const renderProgress = document.getElementById("render-bar-progress")! as HTMLDivElement;



export function updateProgressMeter(value: number) {
	const width = `${value * 100}%`;

	renderProgress.style.width = width;

	if(value === 1) {
		renderContainer.classList.add("hide");
	}
}



export function showRenderProgress() {
	renderContainer.classList.remove("hide");

	renderProgress.style.width = "0";
}
