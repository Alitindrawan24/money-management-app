<template>
    <div :class="{ 'dark text-bodydark bg-boxdark-2': darkMode }">
        <slot></slot>
    </div>
</template>

<script>
export default {
    setup() {
        const colorMode = useColorMode()
        const darkMode = computed({
            get () {
                return colorMode.value === 'dark'
            },
            set () {
                colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
            }
        })

        return {
            darkMode
        }
    }
}
</script>