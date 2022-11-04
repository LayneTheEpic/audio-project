import {getId} from "../util.js";



const inputModal = getId<HTMLDivElement>("input-modal");
const inputLabel = getId<HTMLParagraphElement>("input-label-type");
const inputInput = getId<HTMLInputElement>("input-input");
const inputError = getId<HTMLParagraphElement>("input-error");



type InputType<T> = T extends "string" ? string : number;



export default class InputModalManager {
	static resolve: (value: any) => void;
	static hasListener: boolean = false;

	static dataset: DOMStringMap;

	// this needs to become a strictly typed object
	static async prompt(dataset: DOMStringMap) {
		inputModal.classList.remove("hide");
		inputLabel.innerText = dataset.label!;
		inputError.innerHTML = "&nbsp;";
		inputInput.value = "";


		this.dataset = dataset;

		if(!this.hasListener) {
			inputInput.addEventListener("change", this.handleChange.bind(this));
			this.hasListener = true;
		}

		const dataType = dataset.type;


		// i have no idea how to do this
		return new Promise<InputType<dataType>>(resolve => {
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

		if(this.dataset.type! === "number") {
			// what am i even writing anymore
			const parsed = parseFloat(value);

			if(isNaN(parsed)) {
				inputError.innerText = "Error: Value isn't a number!";
				return;
			}

			if(parsed < parseFloat(this.dataset.min!)) {
				inputError.innerText = `Error: Value is smaller than ${this.dataset.min!}!`;
				return;
			}

			if(parsed > parseFloat(this.dataset.max!)) {
				inputError.innerText = `Error: Value is greater than ${this.dataset.max!}!`;
				return;
			}


			inputModal.classList.add("hide")

			this.resolve(parsed);
		}
	}
}
