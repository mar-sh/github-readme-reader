<template>
  <ul class="row list-unstyled px-4">
    <li
      class="col-sm-12 col-md-6 mb-2 p-2 h6"
      v-for="user in data"
      :key="user.id"
    >
      <router-link :to="`/${user.login}`">
        {{ `${user.login}` }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'UserList',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style></style>
