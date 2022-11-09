import {getId} from "../util.js";

import type {InputDataset} from "../types/types.js";



const inputModal = getId<HTMLDivElement>("input-modal");
const inputLabel = getId<HTMLParagraphElement>("input-label-type");
const inputInput = getId<HTMLInputElement>("input-input");
const inputError = getId<HTMLParagraphElement>("input-error");



type MapType<T> = T extends "number" ? number : T extends "string" ? string : never;



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


		this.dataset = dataset;

		if(!this.hasListener) {
			inputInput.addEventListener("change", this.handleChange.bind(this));
			this.hasListener = true;
		}

		const dataType = dataset.type;


		return new Promise<MapType<typeof dataType>>(resolve => {
			this.resolve = resolve;
		});

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

			if(isNaN(parsed)) {
				inputError.textContent = "Error: Value isn't a number!";
				return;
			}

			if(parsed < parseFloat(this.dataset.min)) {
				inputError.textContent = `Error: Value is smaller than ${this.dataset.min!}!`;
				return;
			}

			if(parsed > parseFloat(this.dataset.max)) {
				inputError.textContent = `Error: Value is greater than ${this.dataset.max!}!`;
				return;
			}


			inputModal.classList.add("hide")

			this.resolve(parsed);
		}
	}
}
