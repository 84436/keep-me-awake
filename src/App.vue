<template>
    <v-app :theme="theme">
        <div class="d-flex flex-column justify-center align-center" style="height: 100vh">
            <v-icon v-if="isAwake" size="128">mdi-white-balance-sunny</v-icon>
            <v-icon v-else size="128">mdi-power-sleep</v-icon>
            <div class="virtual-spacer my-4"></div>
            <v-switch color="black" class="flex-grow-0" v-model="isAwake" label="Keep me awake"></v-switch>
            <video loop id="video-element" src="/blank.mp4"></video>
        </div>
    </v-app>
</template>

<script>
import { setUpWakelock, releaseWakelock } from "./services/wakelockService";
import { startVideo, stopVideo } from "./services/videoService";
// import { startAudio, stopAudio } from "./services/audioService";
import { FAVICONS, setFavicon } from "./services/faviconService";

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
                setUpWakelock();
                startVideo();
                setFavicon(FAVICONS.AWAKE);
            } else {
                releaseWakelock();
                stopVideo();
                setFavicon(FAVICONS.SLEEP);
            }
        },
    },
};
</script>

<style>
html {
    overflow-y: hidden !important;
}
#video-element {
    visibility: collapse !important;
}
</style>
