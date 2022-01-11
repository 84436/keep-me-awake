/**
 * This whole snippet will create a simple tone generator then starts
 * immediately. The resulting audio will not be played until
 * the generator is connected to the sink (audio context destination.)
 *
 * Read about Web Audio API @ MDN for more info.
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
 *
 * The following is roughly the audio graph for this app:
 *     [Oscillator] -> [Gain] x--> <Sink>
 *     x = where the toggle is
 */

let audioContext = null;
let audioGain = null;
let soundOscillator = null;

const setUpAudio = () => {
    // Creates an audio context
    audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Create a gain node,
    // which controls the volume of whatever gets passed thru this node
    audioGain = audioContext.createGain();
    audioGain.gain.value = 0.1;

    // Create an oscillator node (aka fancy tone generator)
    // that plays a 10Hz tone, then connect it to gain node
    soundOscillator = audioContext.createOscillator();
    soundOscillator.frequency.value = 10;
    soundOscillator.connect(audioGain);

    // We can't start() the oscillator a second time once it's stop()'ed,
    // so we'll keep it "playing" indefinitely in background.
    // We'll connect() it to sink when we actually need the audio.
    soundOscillator.start();

    console.log("Audio Service: setup completed");
};

const startAudio = () => {
    if (!audioContext) setUpAudio();
    audioContext.resume().then(() => {
        audioGain.connect(audioContext.destination);
    });
    console.log("Audio Service: audio started");
};

const stopAudio = () => {
    audioGain.disconnect(audioContext.destination);
    console.log("Audio Service: audio stopped");
};

export { startAudio, stopAudio };
