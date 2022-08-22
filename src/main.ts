import visualizeAudio from "./audioVisualizer.js";



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

	// Create audioSource
	const audioUrl = URL.createObjectURL(file); // turn the file contents into something accessible
	const audioElement = new Audio(audioUrl);

	const audioSource = audioContext.createMediaElementSource(audioElement);


	// Create offlineContext (this will calculate where beats land in the background)
	const audioLength = await new Promise(resolve => {
		audioElement.addEventListener("durationchange", () => {
			resolve(audioElement.duration);
		}, {once: true});
	}) as number;

	// alert(Math.round(audio.duration * 44100));

	const offlineContext = new OfflineAudioContext({
		numberOfChannels: 2,
		length: Math.ceil(audioLength * 44100),
		sampleRate: 44100
	});

	// hgkjdfkgdkdkdfdfjkgfddfgjkfdgjkffdjkfkjd
	// offlineContext.buffer =


	// source.








	const frequencyAnalyzer = audioContext.createAnalyser();
	frequencyAnalyzer.fftSize = 512; // default: 2048
	// frequencyAnalyzer.smoothingTimeConstant = 0;

	const beatAnalyzer = audioContext.createAnalyser();
	beatAnalyzer.smoothingTimeConstant = 0; // easier to analyze values

	const filter = audioContext.createBiquadFilter();
	filter.type = "lowpass";


	audioSource.connect(audioContext.destination);
	// source.connect(frequencyAnalyzer);
	audioSource.connect(filter).connect(frequencyAnalyzer);
	audioSource.connect(filter).connect(beatAnalyzer);

	audioElement.play();





	// ctx.translate(0, height);
	// ctx.transform(1, 0, 0, -1, 0, height);
	// requestAnimationFrame(() => processAudio(audioContext, frequencyAnalyzer, beatAnalyzer));
}



// function processAudio(audioContext: AudioContext, frequencyAnalzyer: AnalyserNode, beatAnalyzer: AnalyserNode) {
// 	// drawCanvasBg();
// 	visualizeAudio(audioContext, frequencyAnalzyer);
// }



function drawCanvasBg() {
	// ctx.fillStyle = `hsl(${randomBetween(0, 360)}, 58%, 53%)`;

}



/*

Ideas:

beat detection changes bg (hsl)


implementation:
	- preload audio into offlinecontext, process, identify peak

*/
