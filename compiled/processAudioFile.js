export default async function processAudioFile(file) {
    const audioUrl = URL.createObjectURL(file); // turn the file contents into something accessible
    const audioElement = new Audio(audioUrl);
    const audioLength = await new Promise(resolve => {
        audioElement.addEventListener("durationchange", () => {
            resolve(audioElement.duration);
        }, { once: true });
    });
    const rawBuffer = await (await fetch(audioUrl)).arrayBuffer();
    const tempContext = new AudioContext();
    const decoded = await tempContext.decodeAudioData(rawBuffer, (audioBuffer) => { return audioBuffer; });
    alert(decoded.duration);
    alert(audioLength);
    const dataBuffer = new Float32Array();
    decoded.copyFromChannel(dataBuffer, 0, 0); // I want both buffers... jkfdskjfkjskfjsdkj
    // decoded.
    return {
        audioLength,
        audioElement,
        dataBuffer
    };
}
