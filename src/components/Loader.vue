<template>
  <p class="text-center font-weight-bold h3">{{ displayText }}</p>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    text: {
      type: String,
      default: 'Loading',
    },
    intervalSpeed: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {
      displayText: this.text,
      interval: () => null,
    };
  },
  created() {
    this.interval = window.setInterval(() => {
      this.displayText === `${this.text}...`
        ? (this.displayText = this.text)
        : (this.displayText += '.');
    }, this.intervalSpeed);
  },
  destroyed() {
    window.clearInterval(this.interval);
  },
};
</script>

<style></style>
