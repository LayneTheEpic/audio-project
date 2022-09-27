const cacheModal = document.getElementById("cache-modal")!;
const cacheYes = document.getElementById("cache-yes")! as HTMLButtonElement;
const cacheNo = document.getElementById("cache-no")! as HTMLButtonElement;




export default class CacheModalManager {
	static res: (value: boolean) => void;

	static async prompt() {
		cacheModal.classList.remove("hide");

		return new Promise<boolean>(res => {
			this.res = res;

			cacheYes.addEventListener("click", this.handleYes.bind(this));

			cacheNo.addEventListener("click", this.handleNo.bind(this));
		});
	}

	private static removeListeners() {
		cacheYes.removeEventListener("click", this.handleYes.bind(this));
		cacheNo.removeEventListener("click", this.handleNo.bind(this));

		cacheModal.classList.add("hide");
	}

	private static handleYes() {
		this.removeListeners();
		this.res(true);
	}

	private static handleNo() {
		this.removeListeners();
		this.res(false);
	}
}