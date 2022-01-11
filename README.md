# `keep-me-awake`

A dirty web-based workaround for keeping computers awake.

This works by playing ~~an inaudible-to-hooman tone (10Hz)~~ a 10-second empty video (with a 10Hz tone @ -40dB) on loop in the background when toggled on. The video is not visible on the page.

![](./doc_assets/screenshot.png)

## Featuring

- Vue 3-ish (still no `setup()`) & [Vuetify 3 alpha](https://next.vuetifyjs.com/en)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) (specifically [this answer](https://stackoverflow.com/a/16573282) from StackOverflow)
- [Bootstrapped with Vite](https://vitejs.dev/)
- Dynamic Favicons (thanks to [this article](https://css-tricks.com/svg-favicons-and-all-the-fun-things-we-can-do-with-them/) @ CSS-Tricks)
