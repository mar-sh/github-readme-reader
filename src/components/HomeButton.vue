<template>
  <router-link to="/">
    <button class="btn btn-lg btn-outline px-1">
      <span class="lead"> 🔙 Go Back to home</span>
    </button>
  </router-link>
</template>

<script>
export default {
  name: 'HomeButton',
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
