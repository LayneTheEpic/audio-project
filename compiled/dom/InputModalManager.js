import { getId } from "../util.js";
const inputModal = getId("input-modal");
const inputLabel = getId("input-label-type");
const inputInput = getId("input-input");
const inputError = getId("input-error");
export default class InputModalManager {
    static resolve;
    static hasListener = false;
    static dataset;
    // this needs to become a strictly typed object
    static async prompt(dataset) {
        inputModal.classList.remove("hide");
        inputLabel.textContent = dataset.label;
        inputError.innerHTML = "&nbsp;";
        inputInput.value = "";
        this.dataset = dataset;
        if (!this.hasListener) {
            inputInput.addEventListener("change", this.handleChange.bind(this));
            inputInput.addEventListener("keyup", this.handleKey.bind(this));
            this.hasListener = true;
        }
        const dataType = dataset.type;
        return new Promise(resolve => {
            this.resolve = resolve;
        });
    }
    static handleKey(key) {
        console.log(key.key);
        if (key.key !== "Escape")
            return;
        if (this.dataset.type === "string") {
            inputModal.classList.add("hide");
            this.resolve("");
            return;
        }
        if (this.dataset.type === "number") {
            inputModal.classList.add("hide");
            this.resolve(NaN);
            return;
        }
    }
    static handleChange() {
        const value = inputInput.value;
        if (this.dataset.type === "string") {
            inputModal.classList.add("hide");
            inputError.innerHTML = "&nbsp;";
            this.resolve(value);
            return;
        }
        if (this.dataset.type === "number") {
            // what am i even writing anymore
            const parsed = parseFloat(value);
            if (isNaN(parsed)) {
                inputError.textContent = "Error: Value isn't a number!";
                return;
            }
            if (parsed < parseFloat(this.dataset.min)) {
                inputError.textContent = `Error: Value is smaller than ${this.dataset.min}!`;
                return;
            }
            if (parsed > parseFloat(this.dataset.max)) {
                inputError.textContent = `Error: Value is greater than ${this.dataset.max}!`;
                return;
            }
            inputModal.classList.add("hide");
            this.resolve(parsed);
        }
    }
}
