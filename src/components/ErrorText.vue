<template>
  <p class="text-center text-danger h5">{{ text }}</p>
</template>

<script>
export default {
  name: 'ErrorText',
  props: {
    text: String,
  },
};
</script>

<style></style>
