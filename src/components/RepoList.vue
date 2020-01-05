<template>
  <div>
    <p class="mb-1">Click on the buttons below to view repository's README.</p>

    <ul class="row list-unstyled px-4">
      <li
        class=" col-sm-12 col-md-6 col-lg-3 p-2"
        v-for="repo in data"
        :key="repo.id"
      >
        <router-link
          class="btn btn-outline-secondary w-100 font-weight-bold text-underline shadow-sm"
          :to="`/${userName}/${repo.name}`"
        >
          {{ repo.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RepoList',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  computed: {
    userName: function() {
      const {
        params: { user },
      } = this.$route;
      return user;
    },
  },
};
</script>

<style scoped>
a {
  color: #0000cc;
}
a:visited {
  color: #551a8b;
}
li:hover > a:visited,
a:hover {
  color: white;
}
</style>
