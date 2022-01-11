/**
 * Wakelocks
 * Currently only Chromium-based browsers are supported.
 * https://developer.mozilla.org/en-US/docs/Web/API/Screen_Wake_Lock_API
 */

let wakelockElement = null;
let setUpWakelock = () => {};
let releaseWakelock = () => {};

if ("wakeLock" in navigator) {
    setUpWakelock = () => {
        try {
            navigator.wakeLock.request("screen").then((wl) => {
                wakelockElement = wl;
            });
            console.log("Wakelock Service: wakelock acquired.");
        } catch (error) {
            console.error(`Wakelock Service: Cannot acquire wakelock: ${error.message}`);
        }
    };

    releaseWakelock = () => {
        wakelockElement &&
            wakelockElement.release().then(() => {
                wakelockElement = null;
                console.log("Wakelock Service: wakelock released.");
            });
    };
} else {
    console.warn("Wakelock Service: Wakelocks are not supported in this browser. Sorry.");
}

export { setUpWakelock, releaseWakelock };
