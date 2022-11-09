import type {FileData} from "./types/types.js";



export default class LocalStorer {
	static cacheFileData(fileData: FileData) {
		localStorage.setItem(fileData.fileName, JSON.stringify(fileData));
	}

	static getFileData(fileName: string) {
		const fileData = localStorage.getItem(fileName);

		if(!fileData) return null;

		return JSON.parse(fileData) as FileData;
	}
}
