import { id } from "../util.js";
const cacheModal = id("cache-modal");
const cacheYes = id("cache-yes");
const cacheNo = id("cache-no");
export default class CacheModalManager {
    static resolve;
    static async prompt() {
        cacheModal.classList.remove("hide");
        return new Promise(resolve => {
            this.resolve = resolve;
            cacheYes.addEventListener("click", this.handleYes.bind(this));
            cacheNo.addEventListener("click", this.handleNo.bind(this));
        });
    }
    static removeListeners() {
        cacheYes.removeEventListener("click", this.handleYes.bind(this));
        cacheNo.removeEventListener("click", this.handleNo.bind(this));
        cacheModal.classList.add("hide");
    }
    static handleYes() {
        this.removeListeners();
        this.resolve(true);
    }
    static handleNo() {
        this.removeListeners();
        this.resolve(false);
    }
}
