<template>
  <p class="text-center text-danger h5">{{ text }}</p>
</template>

<script>
export default {
  name: 'Error',
  props: {
    text: String,
  },
};
</script>

<style></style>
