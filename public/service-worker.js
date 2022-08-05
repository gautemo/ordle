/* eslint-disable no-undef */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js')

self.__WB_DISABLE_DEV_LOGS = true
const { registerRoute } = workbox.routing
const { NetworkFirst } = workbox.strategies

registerRoute(() => true, new NetworkFirst())
