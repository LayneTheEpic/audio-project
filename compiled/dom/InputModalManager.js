import { getId } from "../util.js";
const inputModal = getId("input-modal");
const inputLabel = getId("input-label-type");
const inputInput = getId("input=input");
export default class InputModalManager {
    static resolve;
    static dataset;
    static async prompt(dataset) {
        inputModal.classList.remove("hide");
        inputLabel.innerText = dataset.label;
        this.dataset = dataset;
        return new Promise(resolve => {
            this.resolve = resolve;
            inputInput.addEventListener("change", this.handleChange.bind(this), { once: true });
        });
    }
    static handleChange() {
        const value = inputInput.value;
        if (this.dataset.type === "string") {
            this.resolve(value);
            return;
        }
        if (this.dataset.type === "number") {
            const parsed = parseFloat(value);
            if (isNaN(parsed)) {
                // error here
                return;
            }
            if (parsed < parseFloat(this.dataset.min)) {
                // error here
                return;
            }
            if (parsed > parseFloat(this.dataset.max)) {
                // error here
                return;
            }
        }
    }
}
