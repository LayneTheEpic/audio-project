import {stopVisualization, visualizeAudioFile} from "./visualizeAudioFile.js";



const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const sidebar = document.getElementById("sidebar")! as HTMLDivElement;

const fileButton = document.getElementById("fileButton")! as HTMLButtonElement;
const input = document.getElementById("fileInput")! as HTMLInputElement;



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



	fileButton.addEventListener("click", () => {input.click()});


	input.addEventListener("change", () => {
		const file = input.files![0];

		if(!file || !file.type.includes("audio/")) return;

		stopVisualization();
		visualizeAudioFile(file, ctx);
	});
}
