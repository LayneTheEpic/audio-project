import {showRenderProgress} from "./renderProgress.js";
import {stopVisualization, visualizeAudioFile} from "../visualizeAudioFile.js";



const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const sidebar = document.getElementById("sidebar")! as HTMLDivElement;

const uploadButton = document.getElementById("upload-button")! as HTMLButtonElement;
const input = document.getElementById("file-input")! as HTMLInputElement;



export default function initDOM() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const {height} = canvas;

	ctx.transform(1, 0, 0, -1, 0, height);



	sidebar.addEventListener("click", () => {
		sidebar.classList.add("show");
	});

	canvas.addEventListener("click", () => {
		sidebar.classList.remove("show");
	});



	uploadButton.addEventListener("click", () => {input.click()});


	input.addEventListener("change", () => {
		const file = input.files![0];

		if(!file || !file.type.includes("audio/")) return;

		stopVisualization();
		sidebar.classList.remove("show");

		showRenderProgress();


		visualizeAudioFile(file, ctx);
	});
}
