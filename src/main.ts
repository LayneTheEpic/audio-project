const input = document.getElementById("fileInput")! as HTMLInputElement;



input.addEventListener("change", async () => {
	const file = input.files![0];

	// if(!file) return; // bruh
	// if(!file.type.includes("audio/")) return;

	const reader = new FileReader();

	reader.addEventListener("error", () => alert("error reading file"));
	reader.addEventListener("load", event => {
		const audioContext = new AudioContext();
		// const buffer = audioContext.createBuffer(2, audioContext.sampleRate * 3, audioContext.sampleRate);
		// buffer.copyToChannel()

		const source = audioContext.createBufferSource();

		// source.buffer = // AudioBuffer needed?
	});

	reader.readAsArrayBuffer(file);
});
