import { isPlusOrMinus } from "./util.js";
export default function createOACRenderer(offlineContext) {
    // I honestly have no idea what this code is that I just wrote
    // basically, it creates a render factory so that I can monitor the the processing
    let currentProgress = 0;
    let bufferLength = offlineContext.length / offlineContext.sampleRate;
    let buffer;
    function checkProgress(resolve, progressEvent) {
        currentProgress = offlineContext.currentTime / bufferLength;
        progressEvent(currentProgress);
        if (isPlusOrMinus(currentProgress, 0.001, 1)) {
            resolve(buffer);
            return;
        }
        requestAnimationFrame(() => checkProgress(resolve, progressEvent));
    }
    const factory = {
        onprogress: () => { },
        render: async () => {
            return new Promise(resolve => {
                buffer = offlineContext.startRendering();
                requestAnimationFrame(() => checkProgress(resolve, factory.onprogress));
            });
        }
    };
    return factory;
}
