import beatDetectionVersion from "./beat-detection/version.js";
import CacheModalManager from "./dom/CacheModalManager.js";
import {createOfflineAudioContext} from "./createAudioContexts.js";
import getMostCommonInterval from "./beat-detection/getPeakIntervals.js";
import LocalStorer from "./LocalStorer.js";
import OACRenderer from "./OACRenderer.js";
import processBeatData from "./beat-detection/processBeatData.js";
import RenderProgressManager from "./dom/RenderProgressManager.js";



export async function checkForCachedData(fileName: string) {
	const cachedData = LocalStorer.getFileData(fileName);

	if(cachedData && cachedData.version === beatDetectionVersion) {
		// we have up-to-date file data

		const useCache = await CacheModalManager.prompt();

		if(useCache === true) {
			return cachedData;
		}
	}

	return null;
}



export async function calculateBeatData(fileName: string, audioBuffer: AudioBuffer) {
	// otherwise, recalculate

	const offlineContext = createOfflineAudioContext(audioBuffer);
	const renderFactory = new OACRenderer(offlineContext);

	renderFactory.setOnProgress(RenderProgressManager.update);

	const processedBuffer = await renderFactory.render();


	const mostCommonInterval = getMostCommonInterval(processedBuffer);
	const beatData = processBeatData(mostCommonInterval, audioBuffer.sampleRate, 40, 180, true);


	LocalStorer.cacheFileData({
		beatData,
		fileName,
		version: beatDetectionVersion
	});

	return beatData;
}
