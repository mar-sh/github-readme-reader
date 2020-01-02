<template>
  <div>
    <home-button />
    <div class="row px-2 mb-2">
      <p class="display-4 col-sm-12 col-md-9">
        {{ `${userName}'s repositories` }}
      </p>

      <a
        class=" btn btn-outline-success text-dark col-sm-12 col-md-3 align-self-center"
        id="user-name"
        :href="userGithub"
        target="__blank"
        >{{ `Go to ${userName}'s Github profile` }}</a
      >
    </div>
    <hr />
    
    <div>
      <loading :loading="loading" text="Fetching repos" />
    </div>
    <div>
    <repo-list v-if="Boolean(userRepos.length)" :data="userRepos"></repo-list>

    </div>
    <div v-if="error">
      <error :text="error" />
    </div>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import HomeButton from '../components/HomeButton.vue';
import Error from '../components/Error.vue';
import Loading from '../components/Loading.vue';
import RepoList from '../components/RepoList.vue';
import { getUserRepos } from '../services/github';

export default {
  name: 'Repos',
  components: {
    HomeButton,
    Error,
    Loading,
    RepoList,
  },
  data() {
    return {
      userRepos: [],
      loading: false,
      error: null,
    };
  },
  created() {
    this.onLoadGetUserRepos();
  },
  methods: {
    async onLoadGetUserRepos() {
      try {
        this.loading = true;

        const {
          params: { user },
        } = this.$route;

        const response = await getUserRepos(user);
        if (response.message) throw response.message;
        if (!response.length) throw 'There is no repository to display.';

        this.userRepos = response;
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
    userGithub: function() {
      const {
        params: { user },
      } = this.$route;
      return `https://github.com/${user}`;
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
