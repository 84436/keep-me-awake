let videoElement = null;
const videoElementSelector = "#video-element";

const setUpVideo = () => {
    videoElement = document.querySelector(videoElementSelector);
    if (videoElement) {
        console.log("Video Service: setup completed");
    } else {
        console.error("Video Service: video element is not present -- This should not happen.");
    }
};

const startVideo = () => {
    if (!videoElement) setUpVideo();
    videoElement.play();
    console.log("Video Service: video started");
};

const stopVideo = () => {
    videoElement.pause();
    videoElement.currentTime = 0;
    console.log("Video Service: video stopped");
};

export { startVideo, stopVideo };
