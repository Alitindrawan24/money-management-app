<template>
    <div>
        <!-- ===== Main Content Start ===== -->
        <main>
            <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <!-- Breadcrumb Start -->
                <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 class="text-title-md2 font-bold text-black dark:text-white">
                        Show Categories
                    </h2>
                </div>
                <!-- Breadcrumb End -->

                <!-- ====== Table Section Start -->
                <div class="flex flex-col gap-6">
                    <!-- ====== Form Elements Section Start -->
                    <div class="grid grid-cols gap-9 sm:grid-cols">
                        <div class="flex flex-col gap-9">

                            <form>
                                <!-- Input Fields -->
                                <div
                                    class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                                    <div class="flex flex-col gap-5.5 p-6.5">
                                        <div>
                                            <label for=""
                                                class="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Name
                                            </label>
                                            <input disabled v-model="category.name" type="text" placeholder="Input category name"
                                                class="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
                                        </div>

                                        <div>
                                            <label for=""
                                                class="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Type
                                            </label>
                                            <div class="relative z-20 bg-transparent dark:bg-form-input">
                                                <select disabled v-model="category.type"
                                                    class="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                                    :class="isOptionSelected && 'text-black dark:text-white'"
                                                    @change="isOptionSelected = true">
                                                    <option disabled selected hidden value="" class="text-body">
                                                        Select Type
                                                    </option>
                                                    <option value="in" class="text-body">In</option>
                                                    <option value="out" class="text-body">Out</option>
                                                </select>
                                                <span class="absolute right-4 top-1/2 z-30 -translate-y-1/2">
                                                    <svg class="fill-current" width="24" height="24" viewBox="0 0 24 24"
                                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <g opacity="0.8">
                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                                fill></path>
                                                        </g>
                                                    </svg>
                                                </span>
                                            </div>

                                        </div>

                                        <div>
                                            <label for=""
                                                class="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Status
                                            </label>
                                            <label for="toggle4" class="flex cursor-pointer select-none items-center">
                                                <div class="relative">
                                                    <input disabled v-model="category.status" type="checkbox" id="toggle4"
                                                        class="sr-only" @change="switcherToggle = !switcherToggle" />
                                                    <div :class="switcherToggle && '!bg-primary'"
                                                        class="block h-8 w-14 rounded-full bg-black"></div>
                                                    <div :class="switcherToggle && '!right-1 !translate-x-full'"
                                                        class="absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition">
                                                    </div>
                                                </div>
                                            </label>
                                        </div>

                                    </div>

                                </div>
                                <!-- ====== Form Elements Section End -->
                            </form>

                        </div>
                        <!-- ====== Table Section End -->
                    </div>
                </div>
            </div>
        </main>
        <!-- ===== Main Content End ===== -->
    </div>
</template>

<script>
export default {
    setup(){
        definePageMeta({
            layout: 'dashboard',
        });

        const page = useCookie("page", {
            default: () => ""
        })
        page.value = "categories";


        const route = useRoute()

        const switcherToggle = ref(true)
        const isOptionSelected = ref(true)

        const category = reactive({
            "name": "",
            "type": "",
            "status": switcherToggle.value ? 1 : 0
        })

        const fetchData = async() => {
            const response = await useApi({
                "method": "GET",
                "path": "/categories/" + route.params.id ,
            })

            if (response.status == "success") {
                category.name = response.data.name
                category.type = response.data.type
                category.status = response.data.status == "active" ? 1 : 0
                switcherToggle.value = response.data.status == "active"
            }
        }


        return {
            switcherToggle,
            isOptionSelected,
            category,
            fetchData
        }
    },
    mounted() {
        this.fetchData()
    }
}
</script>