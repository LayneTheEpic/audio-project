import { isPlusOrMinus } from "./util.js";
export default class OACRenderer {
    buffer;
    bufferLength;
    currentProgress = 0;
    offlineContext;
    progressEvent;
    resolve;
    constructor(offlineContext) {
        // this.buffer = offlineContext.startRendering();
        this.bufferLength = offlineContext.length / offlineContext.sampleRate;
        this.offlineContext = offlineContext;
    }
    setOnProgress(progressEvent) {
        this.progressEvent = progressEvent;
    }
    async render() {
        return new Promise(resolve => {
            this.buffer = this.offlineContext.startRendering();
            this.resolve = resolve;
            // ensure "this" stays bound
            // alternatively, () => this.check() would work
            requestAnimationFrame(this.checkProgress.bind(this));
        });
    }
    checkProgress() {
        this.currentProgress = this.offlineContext.currentTime / this.bufferLength;
        if (isPlusOrMinus(this.currentProgress, 1, 0.001)) {
            // not entirely precise math, just round
            this.currentProgress = 1;
            this.progressEvent(this.currentProgress);
            this.resolve(this.buffer);
            return;
        }
        this.progressEvent(this.currentProgress);
        requestAnimationFrame(this.checkProgress.bind(this));
    }
}
