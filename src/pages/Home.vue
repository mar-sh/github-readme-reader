<template>
  <div id="home">
    <h1 class="mb-2 display-5">
      Github Repository's README Reader.
    </h1>

    <form class="input-group mb-3" @submit.prevent="onSubmitSearchUser">
      <base-input
        type="text"
        class="form-control mr-2"
        placeholder="Input a github username e.g gaearon"
        :value="searchInput"
        autofocus
        autocomplete="off"
        @input="onChangeText"
      />
      <button class="btn btn-outline-primary">Search user</button>
    </form>
    <div v-if="isLoading" key="search-loading">
      <loader text="Searching" />
    </div>

    <div>
      <div v-if="foundClosestMatch" key="search-closest">
        <p class="text-center h4">
          We didn't find that username, perhaps you were looking for:
        </p>
        <user-list :data="closestMatchList" />
      </div>

      <div v-if="isError" key="search-error">
        <error-text :text="errorMessage" />
      </div>
    </div>
  </div>
</template>

<script>
import ErrorText from '@/components/ErrorText';
import BaseInput from '@/components/BaseInput';
import Loader from '@/components/Loader';
import UserList from '@/components/UserList';

import { getUser, getUserClosestMatch } from '@/services/github';

export default {
  name: 'Home',
  components: {
    BaseInput,
    ErrorText,
    Loader,
    UserList,
	},
	
  data() {
    return {
      closestMatchList: [],
      errorMessage: '',
      isLoading: false,
      isNoExactMatch: false,
      isNoClosestMatch: false,
      searchInput: '',
    };
	},
	
  methods: {
    onChangeText(text) {
      this.searchInput = text;
    },
    onInitSearch() {
      this.errorMessage = '';
      this.isNoExactMatch = false;
      this.isNoClosestMatch = false;
      this.isLoading = true;
      this.closestMatchList = [];
    },
    async onSubmitSearchUser() {
      try {
        this.onInitSearch();
        if (!Boolean(this.searchInput))
          throw new Error('Please fill in a github username.');

        const response = await getUser(this.searchInput);
        if (response.message) {
          this.isNoExactMatch = true;
          this.onUserNotFoundSearchMatch();
        } else {
          this.isLoading = false;
          this.$router.push({
            name: 'user-repos',
            params: { user: this.searchInput },
          });
        }
      } catch (error) {
        this.isLoading = false;
        if (error.message) {
          this.errorMessage = error.message;
        } else
          this.errorMessage =
            'Something wrong happened. Please try again or reload the page.';
      }
    },
    async onUserNotFoundSearchMatch() {
      try {
        const response = await getUserClosestMatch(this.searchInput);

        if (!Boolean(response.total_count)) {
          this.isLoading = false;
          this.isNoClosestMatch = true;
          throw new Error(
            "We didn't find any github profiles with that username.",
          );
        } else {
          this.isLoading = false;
          this.closestMatchList = response.items;
        }
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
    foundClosestMatch() {
      return this.isNoExactMatch && this.closestMatchList.length;
    },
    isError() {
      return Boolean(this.errorMessage);
    },
  },
};
</script>

<style scoped>
#home {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
