const cacheModal = document.getElementById("cache-modal");
const cacheYes = document.getElementById("cache-yes");
const cacheNo = document.getElementById("cache-no");
export default class CacheModalManager {
    static res;
    static async prompt() {
        cacheModal.classList.remove("hide");
        return new Promise(res => {
            this.res = res;
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
        this.res(true);
    }
    static handleNo() {
        this.removeListeners();
        this.res(false);
    }
}
