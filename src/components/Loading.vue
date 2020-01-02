<template>
  <div v-if="loading">
    <p class="text-center font-weight-bold  h3">{{ `${text}...` }}</p>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    loading: Boolean,
    text: String,
  },
};
</script>

<style></style>
