export default class AudioPlayer {
	private static audio: HTMLAudioElement;

	static setAudio(audio: HTMLAudioElement) {
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
