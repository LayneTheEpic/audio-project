import type {FileData} from "../types.js";



export default class LocalStorer {
	static cacheFileData(fileData: FileData) {
		localStorage.setItem(fileData.fileName, JSON.stringify(fileData));
	}

	private static hasFileData(fileName: string) {
		// coerce to boolean
		return !!(localStorage.getItem(fileName));
	}

	static getFileData(fileName: string) {
		if(!this.hasFileData(fileName)) {
			return null;
		}

		return JSON.parse(localStorage.getItem(fileName)!) as FileData;
	}
}
