<template>
  <div>
    {{ product }}
  </div>
</template>

<script lang="ts" setup>
const { $bigcommerce } = useNuxtApp()
const product = ref(null)

onMounted(() => {
  product.value = $bigcommerce.product.getById(77)
})
</script>
