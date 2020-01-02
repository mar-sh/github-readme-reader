<template>
  <router-link to="/">
    <button class="btn btn-lg btn-outline">
      <span class="lead"> 🔙 Go Back to home</span>
    </button>
  </router-link>
</template>

<script>
export default {
  name: 'BackButton',
};
</script>

<style scoped>
button:focus {
  outline: 0;
}

a,
a:hover {
  color: inherit;
  text-decoration: none;
}
</style>
