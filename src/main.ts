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


	const offlineSource = offlineContext.createBufferSource();
	// offlineSource.buffer!.
	// audioElement.

	// Visualization

	const frequencyAnalyzer = audioContext.createAnalyser();
	frequencyAnalyzer.fftSize = 512;
	// frequencyAnalyzer.smoothingTimeConstant = 0;



	// Beat detection

	const audioBeatFilter = audioContext.createBiquadFilter();
	audioBeatFilter.type = "lowpass";

	const offlineBeatFilter = offlineContext.createBiquadFilter();
	offlineBeatFilter.type = "lowpass";



	// Connect things

	audioSource.connect(audioContext.destination);

	// audioSource.connect(frequencyAnalyzer);
	audioSource.connect(audioBeatFilter).connect(frequencyAnalyzer); // debugging


	// pain... because whY WOULD I BE ABLE TO CONNECT AN ONLINE NODE TO AN OFFLINE NODE? :)
	// audioSource.connect(offlineBeatFilter).connect(offlineContext.destination);


	audioElement.play();


	const processedBuffer = await offlineContext.startRendering();


	ctx.translate(0, height);
	ctx.transform(1, 0, 0, -1, 0, height);


	requestAnimationFrame(() => visualizeAudio(ctx, audioContext, frequencyAnalyzer));
}




/*

Ideas:

beat detection changes bg (hsl)


implementation:
	- preload audio into offlinecontext, process, identify peak

*/
