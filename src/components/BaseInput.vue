<template>
  <input v-bind="$attrs" :value="value" v-on="listeners" />
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    value: String,
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: event => this.$emit('input', event.target.value),
      };
    },
  },
};
</script>

<style></style>
