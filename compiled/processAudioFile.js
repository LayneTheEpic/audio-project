export function createAudioElement(file) {
    const audioUrl = URL.createObjectURL(file);
    return new Audio(audioUrl);
}
export async function generateAudioBuffer(file) {
    const rawBuffer = await file.arrayBuffer();
    const tempContext = new AudioContext();
    const audioBuffer = await tempContext.decodeAudioData(rawBuffer);
    return audioBuffer;
}
