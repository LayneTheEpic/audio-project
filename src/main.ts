const input = document.getElementById("fileInput")! as HTMLInputElement;



input.addEventListener("change", main);



async function main() {
	const file = input.files![0];

	if(!file || !file.type.includes("audio/")) return;


	const audioContext = new AudioContext();

	const url = URL.createObjectURL(file); // turn the file contents into something accessible
	const audio = new Audio(url);

	const source = audioContext.createMediaElementSource(audio);


	const analyzer = audioContext.createAnalyser();


	source.connect(analyzer).connect(audioContext.destination);

	audio.play();
}



/*

Ideas:

beat detection changes bg (hsl)

*/
