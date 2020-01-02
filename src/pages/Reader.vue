<template>
  <div id="readme">
    <loading :loading="loading" text="Fetching Readme" />

    <div v-if="!loading" class="overflow-auto">
      <div class="d-flex justify-content-between">
        <p class="lead font-weight-bold">{{ `${repoName}'s README` }}</p>
        <span class="align-self-center"
          ><router-link :to="`/${userName}`">𝗫</router-link></span
        >
      </div>
      <hr />
      <vue-markdown v-if="readme" :source="readme"></vue-markdown>
    </div>
    <div v-if="error">
      <error :text="error" />
    </div>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown';

import Error from '../components/Error.vue';
import Loading from '../components/Loading.vue';
import { getReadme } from '../services/github';

export default {
  name: 'Reader',
  components: {
    Error,
    Loading,
    VueMarkdown,
  },
  data() {
    return {
      readme: '',
      loading: false,
      error: null,
    };
  },
  created() {
    this.onLoadGetReadme();
  },
  mounted() {
    const readmeDiv = document.getElementById('readme');
    readmeDiv.scrollIntoView();
  },
  methods: {
    async onLoadGetReadme() {
      try {
        this.loading = true;
        const {
          params: { user, repo },
        } = this.$route;
        const response = await getReadme(user, repo);

        if (response.message) throw response.message;
        if (!response.length) throw 'There is no content to display.';

        this.readme = response;
        this.loading = false;
      } catch (e) {
        this.loading = false;
        this.error = e;
      }
    },
  },
  computed: {
    userName: function() {
      const {
        params: { user },
      } = this.$route;
      return user;
    },
    repoName: function() {
      const {
        params: { repo },
      } = this.$route;
      return repo;
    },
    noReadme: function() {
      return !this.loading && !Boolean(this.readme);
    },
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
</style>
