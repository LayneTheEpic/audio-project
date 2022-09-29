export default class AudioPlayer {
    audio;
    constructor(audio) {
        this.audio = audio;
    }
    start() {
        this.audio.play();
    }
    stop() {
        this.audio.pause();
    }
}
