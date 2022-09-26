import beatDetectionVersion from "./beat-detection/version.js";
import calculateBeatData from "./beat-detection/calculateBeatData.js";
import createOACRenderer from "./createOACRenderer.js";
import {createOfflineAudioContext} from "./createAudioContexts.js";
import getMostCommonInterval from "./beat-detection/getPeakIntervals.js";
import LocalStorer from "./localStorage/LocalStorer.js";
import promptUseCacheModal from "./localStorage/cacheModal.js";
import {updateProgressMeter} from "./dom/renderProgress.js";



export default async function getBeatData(fileName: string, audioBuffer: AudioBuffer) {
	const cachedData = LocalStorer.getFileData(fileName);

	if(cachedData && cachedData.version === beatDetectionVersion) {
		// we have up-to-date file data

		const useCache = await promptUseCacheModal();

		if(useCache === true) {
			return cachedData;
		}
	}

	// otherwise, recalculate


	const offlineContext = createOfflineAudioContext(audioBuffer);
	const renderFactory = createOACRenderer(offlineContext);

	renderFactory.onprogress = updateProgressMeter;

	const processedBuffer = await renderFactory.render();

	const mostCommonInterval = getMostCommonInterval(processedBuffer);
	const beatData = calculateBeatData(mostCommonInterval, audioBuffer.sampleRate, 40, 180, true);


	LocalStorer.cacheFileData({
		...beatData,
		fileName,
		version: beatDetectionVersion
	});

	return beatData;
}
