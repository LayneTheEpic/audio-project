export default class AudioPlayer {
	private audio: HTMLAudioElement;

	constructor(audio: HTMLAudioElement) {
		this.audio = audio;
	}

	start() {
		this.audio.play();
	}

	stop() {
		this.audio.pause();
	}
}
