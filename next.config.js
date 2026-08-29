const withPWA = require("next-pwa")({
    dest: "public",
    disable: process.env.NODE_ENV === "development",
    register: true,
    skipWaiting: true,
    fallbacks: {
        document: "/offline",
    },
    runtimeCaching: [
        {
            urlPattern: /^https:\/\/openapi\.programming-hero\.com\/.*/i,
            handler: "CacheFirst",
            options: {
                cacheName: "lessons-api-cache",
                expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 24 * 60 * 60,
                },
            },
        },
        {
            urlPattern: /^https:\/\/api\.dictionaryapi\.dev\/.*/i,
            handler: "CacheFirst",
            options: {
                cacheName: "dictionary-api-cache",
                expiration: {
                    maxEntries: 200,
                    maxAgeSeconds: 7 * 24 * 60 * 60,
                },
            },
        },
        {
            urlPattern: /\/_next\/static\/.*/i,
            handler: "CacheFirst",
            options: {
                cacheName: "next-static-cache",
                expiration: {
                    maxEntries: 100,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                },
            },
        },
        {
            urlPattern: /\/_next\/image\?.*/i,
            handler: "CacheFirst",
            options: {
                cacheName: "next-image-cache",
                expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 30 * 24 * 60 * 60,
                },
            },
        },
        {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
                cacheName: "google-fonts-cache",
                expiration: {
                    maxEntries: 10,
                    maxAgeSeconds: 365 * 24 * 60 * 60,
                },
            },
        },
        {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
                cacheName: "google-fonts-static-cache",
                expiration: {
                    maxEntries: 20,
                    maxAgeSeconds: 365 * 24 * 60 * 60,
                },
            },
        },
    ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withPWA(nextConfig);