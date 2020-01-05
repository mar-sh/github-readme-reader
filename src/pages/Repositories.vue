<template>
  <div>
    <home-button />
    <div class="row px-2 mb-2">
      <p class="display-4 col-sm-12 col-md-9">
        {{ `${userName}'s repositories` }}
      </p>

      <a
        class=" btn btn-outline-success font-weight-bold col-sm-12 col-md-3 align-self-center"
        id="user-name"
        :href="userGithub"
        target="__blank"
        >{{ `Go to ${userName}'s Github profile` }}</a
      >
    </div>
    <hr />

    <div v-if="isLoading" key="search-loading">
      <loader text="Fetching repos" />
    </div>

    <div>
      <repo-list v-if="isUserRepos" :data="userRepos"></repo-list>
    </div>

    <div v-if="isError" key="search-error">
      <error-text :text="errorMessage" />
    </div>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import ErrorText from '@/components/ErrorText';
import HomeButton from '@/components/HomeButton';
import Loader from '@/components/Loader';
import RepoList from '@/components/RepoList';

import { getUserRepos } from '@/services/github';

export default {
  name: 'Repos',

  components: {
    ErrorText,
    Loader,
    HomeButton,
    RepoList,
  },

  data() {
    return {
      errorMessage: '',
      isLoading: false,
      userRepos: [],
    };
  },

  created() {
    this.onLoadGetUserRepos();
  },

  methods: {
    async onLoadGetUserRepos() {
      try {
        this.isLoading = true;
        const {
          params: { user },
        } = this.$route;
        const response = await getUserRepos(user);

        if (response.message) throw new Error(response.message);
        if (!response.length)
          throw new Error('There is no repository to display.');

        this.userRepos = response;
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
    userGithub() {
      const {
        params: { user },
      } = this.$route;

      return `https://github.com/${user}`;
    },
    isUserRepos() {
      return Boolean(this.userRepos.length);
    },
    isError() {
      return Boolean(this.errorMessage);
    },
  },
};
</script>

<style scoped>
#user-name:hover {
  text-decoration: none;
  color: white;
}
</style>
