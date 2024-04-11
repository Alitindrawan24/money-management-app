<template>
    <div>
        <!-- ===== Main Content Start ===== -->
        <main>
            <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <!-- Breadcrumb Start -->
                <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 class="text-title-md2 font-bold text-black dark:text-white">
                        Transactions
                    </h2>
                </div>
                <!-- Breadcrumb End -->

                <!-- ====== Table Section Start -->
                <div class="flex flex-col gap-6">
                    <!-- ====== Table Three Start -->
                    <div class="w-full">
                        <NuxtLink to="/transactions/create">
                            <button
                                class="flex float-right justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                <svg class="fill-current mr-2" width="18" height="18" viewBox="0 0 448 512" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                                        fill />
                                </svg>
                                Add Transaction
                            </button>
                        </NuxtLink>
                    </div>

                    <div
                        class="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                        <div class="max-w-full overflow-x-auto">
                            <table class="w-full table-auto">
                                <thead>
                                    <tr class="bg-gray-2 text-left dark:bg-meta-4">
                                        <th class="w-[15%] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                            Category
                                        </th>
                                        <th class="w-[20%] px-4 py-4 font-medium text-black dark:text-white">
                                            Date
                                        </th>
                                        <th class="w-[20%] px-4 py-4 font-medium text-black dark:text-white">
                                            Amount
                                        </th>
                                        <th class="w-[40%] px-4 py-4 font-medium text-black dark:text-white">
                                            Description
                                        </th>
                                        <th class="px-4 py-4 w-[5%] font-medium text-black dark:text-white">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(transaction, index) in transactions" :key="index">
                                        <td
                                            class="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                            <h5 class="font-medium text-black dark:text-white">{{ transaction.category.name }}</h5>
                                        </td>
                                        <td
                                            class="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                                            <h5 class="font-medium text-black dark:text-white">{{ transaction.date_formatted }}</h5>
                                        </td>
                                        <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p v-if="transaction.category.type == 'in'"
                                                class="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success">
                                                {{ transaction.amount_formatted }}
                                            </p>
                                            <p v-if="transaction.category.type == 'out'"
                                                class="inline-flex rounded-full bg-danger bg-opacity-10 px-3 py-1 text-sm font-medium text-danger">
                                                {{ transaction.amount_formatted }}
                                            </p>
                                        </td>
                                        <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            {{ transaction.description }}
                                        </td>
                                        <td class="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <ActionButton :key="transaction.id" :fetchData="fetchData" :destroy="'/transactions/' + transaction.id" :show="'/transactions/' + transaction.id" :edit="'/transactions/' + transaction.id +'/edit'"/>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>

                    <Pagination :meta="meta" :fetchData="fetchData"/>

                    <!-- ====== Table Three End -->
                </div>
                <!-- ====== Table Section End -->
            </div>
        </main>
    </div>
</template>

<script>
export default {
    setup(){
        definePageMeta({
            layout: 'dashboard',
        })

        const page = useCookie("page", {
            default: () => ""
        })
        page.value = "transactions";

        const transactions = ref({})
        const meta = ref({})

        const fetchData = async(url = null) => {
            const response = await useApi({
                "method": "GET",
                "path": url ?? "/transactions"
            })

            transactions.value = response.data.data
            meta.value = response.data.meta
        }

        return {
            transactions,
            meta,
            fetchData
        }
    },
    mounted() {
        this.fetchData();
    }
}
</script>