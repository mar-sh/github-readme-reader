<template>
  <div id="readme">
    <div v-if="isLoading" key="readme-loading">
      <loader text="Fetching Readme" />
    </div>

    <div v-if="!isLoading" class="overflow-auto" key="readme-result">
      <div class="d-flex justify-content-between">
        <p class="lead font-weight-bold">{{ `${repoName}'s README` }}</p>
        <span class="align-self-center"
          ><router-link :to="`/${userName}`">𝗫</router-link></span
        >
      </div>
      <hr />
      <vue-markdown v-if="readmeContent" :source="readmeContent"></vue-markdown>
    </div>

    <div v-if="isError" key="readme-error">
      <error-text :text="errorMessage" />
    </div>
  </div>
</template>

<script>
import ErrorText from '@/components/ErrorText';
import Loader from '@/components/Loader';
import VueMarkdown from 'vue-markdown';

import { getReadme } from '@/services/github';

export default {
  name: 'Reader',

  components: {
    ErrorText,
    Loader,
    VueMarkdown,
  },

  data() {
    return {
      errorMessage: '',
      isLoading: false,
      readmeContent: '',
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
        this.isLoading = true;
        const {
          params: { user, repo },
        } = this.$route;
        const response = await getReadme(user, repo);

        if (response.message) throw new Error(response.message);
        if (!response.length)
          throw new Error('There is no README content to display.');

        this.readmeContent = response;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        if (error.message) {
          this.errorMessage = error.message;
        } else
          this.errorMessage =
            'Something wrong happened. Please try again or reload the page.';
      }
    },
  },

  computed: {
    userName() {
      const {
        params: { user },
      } = this.$route;
      return user;
    },
    repoName() {
      const {
        params: { repo },
      } = this.$route;
      return repo;
    },
    isError() {
      return Boolean(this.errorMessage);
    },
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
</style>
