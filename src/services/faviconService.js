let faviconElement = null;
const faviconElementSelector = "#favicon-element";

const ASSETS_PATH = `${location.pathname.substring(0, location.pathname.length - 1)}`;
const FAVICONS = {
    DEFAULT: `${ASSETS_PATH}/favicon.svg`,
    SLEEP: `${ASSETS_PATH}/favicon.svg`,
    AWAKE: `${ASSETS_PATH}/favicon_awake.svg`,
};

const setUpFavicon = () => {
    faviconElement = document.querySelector(faviconElementSelector);
    if (faviconElement) {
        console.log("Favicon Service: setup completed");
    } else {
        console.error("Favicon Service: favicon element is not present -- dynamic favicon will not be available.");
    }
};

const setFavicon = (icon) => {
    if (!faviconElement) setUpFavicon();
    faviconElement.setAttribute("href", icon);
    console.log(`Favicon Service: icon set to ${icon}`);
};

export { FAVICONS, setFavicon };
