export default class LocalStorer {
    static cacheFileData(fileData) {
        localStorage.setItem(fileData.fileName, JSON.stringify(fileData));
    }
    static hasFileData(fileName) {
        // coerce to boolean
        return !!(localStorage.getItem(fileName));
    }
    static getFileData(fileName) {
        if (!this.hasFileData(fileName)) {
            return null;
        }
        return JSON.parse(localStorage.getItem(fileName));
    }
}
