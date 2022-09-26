const cacheModal = document.getElementById("cache-modal")!;
const cacheYes = document.getElementById("cache-yes")! as HTMLButtonElement;
const cacheNo = document.getElementById("cache-no")! as HTMLButtonElement;



function handleYes() {
	onclick();
	_res(true);
}



function handleNo() {
	onclick();
	_res(false);
}



function onclick() {
	cacheYes.removeEventListener("click", handleYes);
	cacheNo.removeEventListener("click", handleNo);

	cacheModal.classList.add("hide");
}



let _res: (value: boolean) => void;



export default async function promptUseCacheModal() {
	cacheModal.classList.remove("hide");

	return new Promise<boolean>(res => {
		_res = res;

		cacheYes.addEventListener("click", handleYes);

		cacheNo.addEventListener("click", handleNo);
	});
}
