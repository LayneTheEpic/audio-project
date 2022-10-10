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

	static stop() {
		this.audio.pause();
	}
}
