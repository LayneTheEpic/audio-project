import { scale } from "./util.js";
export default class AudioPlayer {
    static audio;
    static setAudio(audio) {
        this.audio = audio;
    }
    static start() {
        this.audio.play();
    }
    static seekTo(where) {
        if (!this.audio)
            return;
        this.audio.currentTime = scale(where, 0, 1, 0, this.audio.duration);
    }
    static getTime() {
        return this.audio.currentTime;
    }
    static getProgress() {
        return this.getTime() / this.audio.duration;
    }
    static stop() {
        this.audio.pause();
    }
}
