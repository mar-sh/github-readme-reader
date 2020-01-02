<template>
  <ul class="row list-unstyled px-4">
    <li
      class="col-sm-12 col-md-6 mb-2 p-2 h6"
      v-for="name in data"
      :key="name.id"
    >
      <router-link :to="`/${name.login}`">
        {{ `${name.login}` }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'UserList',
  props: {
    data: Array,
  },
};
</script>

<style></style>
