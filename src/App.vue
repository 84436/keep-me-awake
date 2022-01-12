<template>
    <v-app :theme="theme">
        <div id="app-element">
            <v-icon v-if="isAwake" size="128">mdi-white-balance-sunny</v-icon>
            <v-icon v-else size="128">mdi-power-sleep</v-icon>
            <v-switch
                color="black"
                class="flex-grow-0 ma-0 pa-0"
                dense
                v-model="isAwake"
                :label="switchLabel"
                :hide-details="true"
            ></v-switch>
            <video loop id="video-element" src="/blank.mp4"></video>
        </div>
    </v-app>
</template>

<script>
import { setUpWakelock, releaseWakelock } from "./services/wakelockService";
import { startVideo, stopVideo } from "./services/videoService";
// import { startAudio, stopAudio } from "./services/audioService";
import { FAVICONS, setFavicon } from "./services/faviconService";

// TODO make this user-settable
const DURATION = 28800; // 28800 seconds = 8 hours

export default {
    name: "App",
    data: () => ({
        isAwake: false,
        countdown: DURATION,
        countdownTimeoutObj: null,
    }),
    computed: {
        theme() {
            return this.isAwake ? "light" : "dark";
        },
        switchLabel() {
            return `Keep me awake for ${this.formatTime(this.countdown)}`;
        },
    },
    watch: {
        countdown(newVal) {
            if (newVal === 0) {
                this.isAwake = false;
                this.countdown = DURATION;
            }
        },
        isAwake(newVal) {
            if (newVal) {
                this.startKeepAwake();
            } else {
                this.stopKeepAwake();
            }
        },
    },
    methods: {
        startTimer() {
            this.countdown -= 1;
            this.countdownTimeoutObj = setTimeout(this.startTimer, 1000);
        },
        stopTimer() {
            clearTimeout(this.countdownTimeoutObj);
        },
        startKeepAwake() {
            setUpWakelock();
            startVideo();
            setFavicon(FAVICONS.AWAKE);
            this.countdown += 1; // we don't want to lose 1 second immediately on countdown starting
            this.startTimer();
        },
        stopKeepAwake() {
            releaseWakelock();
            stopVideo();
            setFavicon(FAVICONS.SLEEP);
            this.stopTimer();
        },
        formatTime(seconds) {
            return new Date(seconds * 1000).toISOString().substring(11, 19);
        },
    },
};
</script>

<style>
html {
    overflow-y: hidden !important;
}
#app-element {
    height: 100vh !important;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    row-gap: 16px;
}
@media screen and (max-height: 300px) {
    #app-element {
        flex-flow: row;
        column-gap: 32px;
    }
}

#video-element {
    /* visibility: collapse !important; */
    display: none !important;
}
</style>
