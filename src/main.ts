import {scale} from "./util.js";



const fileButton = document.getElementById("fileButton")! as HTMLButtonElement;
const input = document.getElementById("fileInput")! as HTMLInputElement;

fileButton.addEventListener("click", () => {input.click()});
input.addEventListener("change", main);


const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const {width, height} = canvas;



async function main() {
	const file = input.files![0];

	if(!file || !file.type.includes("audio/")) return;


	fileButton.classList.add("hide");

	const audioContext = new AudioContext();

	const url = URL.createObjectURL(file); // turn the file contents into something accessible
	const audio = new Audio(url);

	const source = audioContext.createMediaElementSource(audio);


	const analyzer = audioContext.createAnalyser();
	analyzer.fftSize = 512; // default: 1024


	source.connect(analyzer).connect(audioContext.destination);

	audio.play();


	requestAnimationFrame(() => animateCanvas(audioContext, analyzer));
}



function animateCanvas(audioContext: AudioContext, analyzer: AnalyserNode) {
	const bars = 256; // 256 * (44100 / 512) = 22050; max of human hearing

	const bufferLength = analyzer.frequencyBinCount;

	// data[n] = n * 44100/fftSize (in Hz)
	const rawData = new Uint8Array(analyzer.frequencyBinCount);
	const data = rawData.subarray(0, bars);

	analyzer.getByteFrequencyData(data); // this is more like a "copyByteDataToArray"


	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, width, height);


	const barWidth = Math.floor(width / bars);
	ctx.fillStyle = "#eee";

	for(let i = 0; i < bars; i++) {
		const scaledBar = Math.round(scale(data[i], 0, 255, 0, height));


		ctx.fillRect(i * barWidth, height - scaledBar, barWidth, scaledBar)
	}


	requestAnimationFrame(() => animateCanvas(audioContext, analyzer));
}



/*

Ideas:

beat detection changes bg (hsl)

*/
