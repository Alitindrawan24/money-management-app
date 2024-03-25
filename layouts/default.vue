<template>
    <div :class="{'dark text-bodydark bg-boxdark-2': darkMode === true}">
        <slot></slot>
    </div>
</template>

<script>
export default {
    setup() {
        const darkMode = useCookie("dark-mode", {
            default: true
        })

        return {
            darkMode
        }
    }
}
</script>