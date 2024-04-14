<template>
    <div :class="{ 'dark text-bodydark bg-boxdark-2': darkMode }">
        <!-- ===== Preloader Start ===== -->
        <Preloader></Preloader>
        <!-- ===== Preloader End ===== -->

        <!-- ===== Page Wrapper Start ===== -->
        <div class="flex h-screen overflow-hidden">
            <!-- ===== Sidebar Start ===== -->
            <Sidebar></Sidebar>
            <!-- ===== Sidebar End ===== -->

            <!-- ===== Content Area Start ===== -->
            <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <!-- ===== Header Start ===== -->
                <Header></Header>
                <!-- ===== Header End ===== -->

                <slot />

                <!-- ===== Main Content End ===== -->
            </div>
            <!-- ===== Content Area End ===== -->
        </div>
        <!-- ===== Page Wrapper End ===== -->
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