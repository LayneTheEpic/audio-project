import {stopVisualization, visualizeAudioFile} from "./visualizeAudioFile.js";



const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const {height} = canvas;

ctx.transform(1, 0, 0, -1, 0, height);




const fileButton = document.getElementById("fileButton")! as HTMLButtonElement;
fileButton.addEventListener("click", () => {input.click()});


const input = document.getElementById("fileInput")! as HTMLInputElement;

input.addEventListener("change", () => {
	const file = input.files![0];

	if(!file || !file.type.includes("audio/")) return;


	stopVisualization();
	visualizeAudioFile(file, ctx);
});
