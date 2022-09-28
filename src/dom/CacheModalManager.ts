import {id} from "../util.js";



const cacheModal = id<HTMLDivElement>("cache-modal");
const cacheYes = id<HTMLButtonElement>("cache-yes");
const cacheNo = id<HTMLButtonElement>("cache-no");




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