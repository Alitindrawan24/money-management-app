<template>
    <div>
        <input :disabled="disabled" v-model="currency" type="text" @input="updateValue($event.target.value)" placeholder="Input amount transaction"
            class="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
    </div>
</template>

<script setup>
const { disabled } = defineProps(["disabled"]);
const currency = ref(0)
const model = defineModel()

const updateValue = (value) => {
    const sanitizedValue = value.replace(/[^0-9]/g, '');
    model.value = sanitizedValue
    currency.value = Intl.NumberFormat().format(sanitizedValue)
}

watch(model, () => {
    currency.value = Intl.NumberFormat().format(model.value)
})

</script>