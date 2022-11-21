export default class AudioPlayer {
    static audio;
    static setAudio(audio) {
        this.audio = audio;
    }
    static start() {
        this.audio.play();
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
