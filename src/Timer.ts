type TimerCallback = (deltaTime: number) => any;



export default class Timer {
	private static frameRate = 1 / 60;
	private static callback: TimerCallback;

	private static accumulatedTime: number = 0;
	private static lastTime: number | null = null;

	static updateProxy(time: number) {
		// if(this.lastTime === null) {
			// lastTime = time;
			// this.enqueue();
		// }
	}

	private static enqueue() {
		requestAnimationFrame(this.updateProxy);
	}

	static setCallback(callback: TimerCallback) {
		this.callback = callback;
	}
}
