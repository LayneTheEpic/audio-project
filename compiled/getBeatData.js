import beatDetectionVersion from "./beat-detection/version.js";
import CacheModalManager from "./dom/CacheModalManager.js";
import calculateBeatData from "./beat-detection/calculateBeatData.js";
import { createOfflineAudioContext } from "./createAudioContexts.js";
import getMostCommonInterval from "./beat-detection/getPeakIntervals.js";
import LocalStorer from "./LocalStorer.js";
import OACRenderer from "./OACRenderer.js";
import RenderProgressManager from "./dom/RenderProgressManager.js";
export default async function getBeatData(fileName, audioBuffer) {
    const cachedData = LocalStorer.getFileData(fileName);
    if (cachedData && cachedData.version === beatDetectionVersion) {
        // we have up-to-date file data
        const useCache = await CacheModalManager.prompt();
        if (useCache === true) {
            return cachedData;
        }
    }
    // otherwise, recalculate
    const offlineContext = createOfflineAudioContext(audioBuffer);
    const renderFactory = new OACRenderer(offlineContext);
    renderFactory.setOnProgress(RenderProgressManager.update);
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
