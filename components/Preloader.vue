<template>
    <div v-show="loaded"
        class="fixed left-0 top-0 z-999999 flex h-screen w-screen items-center justify-center bg-white dark:bg-black">
        <div class="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent">
        </div>
    </div>

</template>

<script>
export default {
    setup() {
        const loaded = ref(true)

        return {
            loaded
        }
    },
    mounted() {
        setTimeout(() => this.loaded = false, 500)
    }
}
</script>