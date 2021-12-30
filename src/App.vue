<template>
    <v-app :theme="theme">
        <div class="d-flex flex-column justify-center align-center" style="height: 100vh">
            <v-icon v-if="isAwake" size="128">mdi-white-balance-sunny</v-icon>
            <v-icon v-else size="128">mdi-power-sleep</v-icon>
            <div class="virtual-spacer my-4"></div>
            <v-switch color="black" class="flex-grow-0" v-model="isAwake" label="Keep me awake"></v-switch>
        </div>
    </v-app>
</template>

<script>
/* Apparently "window" object is not available inside a Vue component
 * (probably for good reason)
 * This whole snippet will create a simple tone generator then starts
 * immediately. The resulting audio will not be played until
 * the generator is connected to the sink (audio context destination.)
 * 
 * Keeping something plays in the background is one of the
 * workaround for keeping the computer awake the whole time
 * without resorting to power settings (n/b: you won't be
 * able to fiddle those stuff in a coroporate environment.)
 * 
 * Read about Web Audio API @ MDN for more info.
 * The following is roughly the audio graph for this app:
 *     [Oscillator] -> [Gain] x--> <Sink>
 *     x = where the toggle is
 * 
 * TODO: there's a better way to keep the screen awake: get a wakelock
 * from "navigator" object. Apparently Chromium only.
 */

// Creates an audio context
var audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create a gain node,
// which controls the volume of whatever gets passed thru this node
var audioGain = audioContext.createGain();
audioGain.gain.value = 1.0;

// Create an oscillator node (aka fancy tone generator)
// that plays a 10Hz tone, then connect it to gain node
var soundOscillator = audioContext.createOscillator();
soundOscillator.frequency.value = 10;
soundOscillator.connect(audioGain);

// We can't start() the oscillator a second time once it's stop()'ed,
// so we'll keep it "playing" indefinitely in background.
// We'll connect() it to sink when we actually need the audio.
soundOscillator.start();

export default {
    name: "App",
    data: () => ({
        isAwake: false,
    }),
    computed: {
        theme() {
            return this.isAwake ? "light" : "dark";
        },
    },
    watch: {
        isAwake(newVal) {
            if (newVal) {
                audioGain.connect(audioContext.destination);
            } else {
                audioGain.disconnect(audioContext.destination);
            }
        },
    },
};
</script>
