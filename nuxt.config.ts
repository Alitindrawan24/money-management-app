// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    devtools: { enabled: false },
    modules: ["@nuxt/ui",'@nuxtjs/tailwindcss'],
    devServer: {
        port: 3001
    },
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
        layoutTransition: { name: 'layout', mode: 'out-in' }
    },
    css: [
        '~/assets/css/custom.css',
        '~/assets/css/satoshi.css',
        '~/assets/css/style.css',
    ],
    runtimeConfig: {
        public: {
            apiHost: ''
        }
    }
})