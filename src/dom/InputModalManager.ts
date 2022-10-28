import {getId} from "../util.js";



const inputModal = getId<HTMLDivElement>("input-modal");
const inputLabel = getId<HTMLSpanElement>("input-label-type");
const inputInput = getId<HTMLInputElement>("input=input");



export default class InputModalManager {
	static resolve: (value: any) => void;

	static dataset: DOMStringMap;

	static async prompt(dataset: DOMStringMap) {
		inputModal.classList.remove("hide");
		inputLabel.innerText = dataset.label!;

		this.dataset = dataset;

		return new Promise(resolve => {
			this.resolve = resolve;

			inputInput.addEventListener("change", this.handleChange.bind(this), {once: true});
		});
	}

	static handleChange() {
		const value = inputInput.value;

		if(this.dataset.type! === "string") {
			this.resolve(value);
			return;
		}

		if(this.dataset.type! === "number") {
			const parsed = parseFloat(value);

			if(isNaN(parsed)) {
				// error here
				return;
			}

			if(parsed < parseFloat(this.dataset.min!)) {
				// error here
				return;
			}

			if(parsed > parseFloat(this.dataset.max!)) {
				// error here
				return;
			}
		}
	}
}
