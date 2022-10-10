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
    static stop() {
        this.audio.pause();
    }
}
