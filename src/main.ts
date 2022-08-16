const input = document.getElementById("fileInput")! as HTMLInputElement;



input.addEventListener("change", () => {
	const file = input.files![0];

	if(!file) return; // bruh
	if(!file.type.includes("audio/")) return;

	const reader = new FileReader();


});
