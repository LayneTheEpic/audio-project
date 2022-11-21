import {getId} from "../util.js";



const cacheModal = getId<HTMLDivElement>("cache-modal");
const cacheYes = getId<HTMLButtonElement>("cache-yes");
const cacheNo = getId<HTMLButtonElement>("cache-no");



// TODO: please make this not terrible

export default class CacheModalManager {
	static resolve: (value: boolean) => void;

	static async prompt() {
		cacheModal.classList.remove("hide");

		return new Promise<boolean>(resolve => {
			this.resolve = resolve;

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
		this.resolve(true);
	}

	private static handleNo() {
		this.removeListeners();
		this.resolve(false);
	}
}