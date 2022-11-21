export default class LocalStorer {
    static cacheFileData(fileData) {
        localStorage.setItem(fileData.fileName, JSON.stringify(fileData));
    }
    static getFileData(fileName) {
        const fileData = localStorage.getItem(fileName);
        if (!fileData)
            return null;
        return JSON.parse(fileData);
    }
}
