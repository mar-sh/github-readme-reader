<template>
  <div>
    <p class="mb-1">Click on the button to view repository's README.</p>

    <ul class="row list-unstyled px-4">
      <router-link
        class="col-sm-12 col-md-6 col-lg-3 p-2"
        v-for="repo in data"
        :to="`/${userName}/${repo.name}`"
        :key="repo.id"
      >
        <li
          class="btn btn-outline-secondary w-100 font-weight-bold text-underline shadow-sm"
        >
          {{ repo.name }}
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'RepoList',
  props: {
    data: Array,
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
li {
  color: #0000cc;
}
a:visited > li {
  color: #551a8b;
}
a:visited > li:hover,
li:hover {
  color: white;
}
</style>
