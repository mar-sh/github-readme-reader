<template>
  <p class="text-center text-danger h5">{{ text }}</p>
</template>

<script>
export default {
  name: 'ErrorText',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
