import {randomBetween, scale} from "./util.js";



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


	const frequencyAnalyzer = audioContext.createAnalyser();
	frequencyAnalyzer.fftSize = 512; // default: 2048

	const beatAnalyzer = audioContext.createAnalyser();
	const filter = audioContext.createBiquadFilter();
	filter.type = "highpass";


	source.connect(filter).connect(audioContext.destination);
	source.connect(filter).connect(frequencyAnalyzer);
	// source.connect(beatAnalyzer);

	audio.play();


	// ctx.translate(0, height);
	ctx.transform(1, 0, 0, -1, 0, height);
	requestAnimationFrame(() => processAudio(audioContext, frequencyAnalyzer, beatAnalyzer));
}



function processAudio(audioContext: AudioContext, frequencyAnalzyer: AnalyserNode, beatAnalyzer: AnalyserNode) {
	// drawCanvasBg();
	animateCanvas(audioContext, frequencyAnalzyer);
}



function drawCanvasBg() {
	// ctx.fillStyle = `hsl(${randomBetween(0, 360)}, 58%, 53%)`;

}



function animateCanvas(audioContext: AudioContext, analyzer: AnalyserNode) {
	const bars = analyzer.fftSize / 2; // 256 * (44100 / 512) = 22050; max of human hearing

	const bufferLength = analyzer.frequencyBinCount;

	// data[n] = n * 44100/fftSize (in Hz)
	const rawData = new Uint8Array(bufferLength);
	const data = rawData.subarray(0, bars);

	analyzer.getByteFrequencyData(data); // this is more like a "copyByteDataToArray"


	ctx.fillStyle = "#000";
	ctx.fillRect(0, 0, width, height);

	const barWidth = Math.floor(width / bars);
	ctx.fillStyle = "#eee";
	ctx.strokeStyle = "#eee";
	ctx.lineWidth = 2;


	for(let i = 0; i < bars; i++) {
		const scaledBar = Math.round(scale(data[i], 0, 255, 0, height));

		if(i === 0) {
			ctx.beginPath();

			ctx.moveTo(0, 0);
			ctx.lineTo(0, scaledBar);
			ctx.lineTo(barWidth - 1, scaledBar);

			continue;
		}


		ctx.lineTo(i * barWidth, scaledBar);
		ctx.lineTo((i + 1) * barWidth - 1, scaledBar);


		if(i === bars - 1) {
			ctx.stroke();
		}
	}


	requestAnimationFrame(() => animateCanvas(audioContext, analyzer));
}



/*

Ideas:

beat detection changes bg (hsl)

*/
