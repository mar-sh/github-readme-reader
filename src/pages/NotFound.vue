<template>
  <div
    id="not-found"
    class="d-flex flex-column justify-content-center align-items-center"
  >
    <h1 class="text-center">Not Found</h1>
    <router-link to="/">
      <button class="btn btn-info">
        Go back to home
      </button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
#not-found {
  min-height: 100vh;
}
a,
a:hover {
  color: inherit;
  text-decoration: none;
}
</style>
