import { getId } from "../util.js";
const inputModal = getId("input-modal");
const inputLabel = getId("input-label-type");
const inputInput = getId("input-input");
const inputError = getId("input-error");
export default class InputModalManager {
    static resolve;
    static hasListener = false;
    static dataset;
    static async prompt(dataset) {
        inputModal.classList.remove("hide");
        inputLabel.innerText = dataset.label;
        inputInput.focus();
        this.dataset = dataset;
        if (!this.hasListener) {
            inputInput.addEventListener("change", this.handleChange.bind(this));
            this.hasListener = true;
        }
        return new Promise(resolve => {
            this.resolve = resolve;
        });
    }
    static handleChange() {
        const value = inputInput.value;
        if (this.dataset.type === "string") {
            inputModal.classList.add("hide");
            inputError.innerHTML = "&nbsp;";
            this.resolve?.(value);
            return;
        }
        if (this.dataset.type === "number") {
            const parsed = parseFloat(value);
            if (isNaN(parsed)) {
                inputError.innerText = "Error: Value isn't a number!";
                return;
            }
            if (parsed < parseFloat(this.dataset.min)) {
                inputError.innerText = `Error: Value is smaller than ${this.dataset.min}!`;
                return;
            }
            if (parsed > parseFloat(this.dataset.max)) {
                inputError.innerText = `Error: Value is greater than ${this.dataset.max}!`;
                return;
            }
            inputModal.classList.add("hide");
            inputError.innerHTML = "&nbsp;";
            this.resolve?.(parsed);
        }
    }
}
