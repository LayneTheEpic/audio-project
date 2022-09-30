export default class Timer {
    static frameRate = 1 / 60;
    static callback;
    static accumulatedTime = 0;
    static lastTime = null;
    static updateProxy(time) {
        // if(this.lastTime === null) {
        // lastTime = time;
        // this.enqueue();
        // }
    }
    static enqueue() {
        requestAnimationFrame(this.updateProxy);
    }
    static setCallback(callback) {
        this.callback = callback;
    }
}
