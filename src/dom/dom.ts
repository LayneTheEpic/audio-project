import addAnimationInputListeners from "./animationInput.js";
import addFrequencyInputListener from "./frequencyInput.js";
import {getClass, getId} from "../util.js";
import {stopVisualization, visualizeAudioFile} from "../visualizeAudioFile.js";
import InputModalManager from "./InputModalManager.js";



const canvas = getId<HTMLCanvasElement>("canvas");
const ctx = canvas.getContext("2d")!;

const sidebar = getId<HTMLDivElement>("sidebar");

const uploadButton = getId<HTMLButtonElement>("upload-button");
const fileInput = getId<HTMLInputElement>("file-input");


let firstRun = true;



export default function initDOM() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	const {height} = canvas;

	ctx.transform(1, 0, 0, -1, 0, height);


	sidebar.addEventListener("click", () => sidebar.classList.add("show"));

	canvas.addEventListener("click", () => sidebar.classList.remove("show"));



	uploadButton.addEventListener("click", () => fileInput.click());

	fileInput.addEventListener("change", () => {
		const file = fileInput.files![0];

		if(!file || !file.type.includes("audio/")) return;

		if(!firstRun) {
			stopVisualization();
		}

		firstRun = false;


		sidebar.classList.remove("show");

		visualizeAudioFile(file, ctx);
	});



	// addAnimationInputListeners();
	addFrequencyInputListener();
	addFullscreenInputListeners();
}



const fullScreenInputs = getClass<HTMLDivElement>("fullscreen-input");


function addFullscreenInputListeners() {
	for(const input of fullScreenInputs) {
		const span = input.children[0]!.children[0]!;

		span.addEventListener("click", async () => {
			const value = await InputModalManager.prompt(input.dataset);
		});
	}
}

