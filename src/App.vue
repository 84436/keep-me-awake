<template>
    <v-app :theme="theme">
        <div id="app-element">
            <v-icon v-if="isAwake" size="128">mdi-white-balance-sunny</v-icon>
            <v-icon v-else size="128">mdi-power-sleep</v-icon>
            <v-switch color="black" class="flex-grow-0 ma-0 pa-0" dense v-model="isAwake" label="Keep me awake" :hide-details="true"></v-switch>
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
