import {getId} from "../util.js";

import type {InputDataset} from "../types.js";



const inputModal = getId<HTMLDivElement>("input-modal");
const inputLabel = getId<HTMLParagraphElement>("input-label-type");
const inputInput = getId<HTMLInputElement>("input-input");
const inputError = getId<HTMLParagraphElement>("input-error");
const inputUnit = getId<HTMLSpanElement>("input-unit");



export default class InputModalManager {
	static resolve: (value: string | number) => void;
	static hasListener: boolean = false;

	static dataset: InputDataset;

	// this needs to become a strictly typed object
	static async prompt(dataset: InputDataset) {
		inputModal.classList.remove("hide");
		inputLabel.textContent = dataset.label!;
		inputError.innerHTML = "&nbsp;";
		inputInput.value = "";

		inputUnit.textContent = dataset.unit ?? "";


		if(!this.hasListener) {
			inputInput.addEventListener("change", this.handleChange.bind(this));
			inputInput.addEventListener("keyup", this.handleKey.bind(this));
			this.hasListener = true;
		}


		this.dataset = dataset;

		return new Promise<string | number>(resolve => {
			this.resolve = resolve;
		});
	}

	static handleKey(key: KeyboardEvent) {
		if(key.key !== "Escape") return;

		if(this.dataset.type === "string") {
			inputModal.classList.add("hide");
			this.resolve("");
			return;
		}

		if(this.dataset.type === "number") {
			inputModal.classList.add("hide");
			// add data-placeholder to put here?
			// make sure to also apply it to the input if i do
			this.resolve(NaN);
			return;
		}
	}

	static handleChange() {
		const value = inputInput.value;

		if(this.dataset.type! === "string") {
			inputModal.classList.add("hide");
			inputError.innerHTML = "&nbsp;";
			this.resolve(value);
			return;
		}

		if(this.dataset.type === "number") {
			// what am i even writing anymore
			const parsed = parseFloat(value);

			let min = -Infinity, max = Infinity;


			if(this.dataset.range) {
				let [minString, maxString] = this.dataset.range.split(",");
				min = parseFloat(minString);
				max = parseFloat(maxString);
			}


			if(isNaN(parsed)) {
				inputError.textContent = "Error: Value isn't a number!";
				return;
			}

			if(parsed < min) {
				inputError.textContent = `Error: Value is smaller than ${min}!`;
				return;
			}

			if(parsed > max) {
				inputError.textContent = `Error: Value is greater than ${max}!`;
				return;
			}


			inputModal.classList.add("hide");

			this.resolve(parsed);
		}

		// this is so terrible and i desparately need to rewrite this class
	}
}
