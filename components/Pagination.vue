<template>
    <div>
        <div class>
            <nav class="float-right" aria-label="Page navigation example">
                <ul class="flex items-center -space-x-px h-8 text-sm">
                    <li v-for="(link, index) in props.meta.links" :key="index">
                        <button v-html="link.label"
                            @click="fetchData(link.url)"
                            :disabled="!link.url"
                            :class="{ 'z-10 text-white bg-graydark dark:bg-meta-4 dark:border-strokedark font-bold border border-gray-300 dark:border-gray-300 dark:text-white' : link.active,  'hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white' : link.url, 'cursor-not-allowed' : !link.url}"
                            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 dark:border-strokedark dark:bg-boxdark bg-white border border-gray-300">
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps(["meta", "fetchData"])
</script>