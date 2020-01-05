<template>
	<div id="home">
		<h1 class="mb-2 display-5">
			Github Repository's README Reader.
		</h1>

		<form class="input-group mb-3" @submit.prevent="onSubmitSearchUser">
			<base-input
				type="text"
				class="form-control mr-2"
				placeholder="Input username e.g gaearon"
				:value="searchInput"
				autofocus
				autocomplete="off"
				@input="onChangeText"
			/>
			<button class="btn btn-outline-primary">Search user</button>
		</form>
		<div v-if="loading">
			<loader text="Searching" />
		</div>
		<div>
			<div v-if="noMatch && Boolean(closestMatches.length)">
				<p class="text-center h5">
					We didn't find that username, perhaps you were looking for:
				</p>
				<user-list :data="closestMatches" />
			</div>

			<div v-if="error">
				<error-text :text="error" />
			</div>
		</div>
	</div>
</template>

<script>
import ErrorText from "../components/ErrorText.vue";
import BaseInput from "../components/BaseInput.vue";
import Loader from "../components/Loader.vue";
import UserList from "../components/UserList.vue";
import { getUser, getUserClosestMatch } from "../services/github";

export default {
	name: "Home",
	components: {
		BaseInput,
		ErrorText,
		Loader,
		UserList
	},
	data() {
		return {
			loading: false,
			error: null,
			searchInput: "",
			noMatch: false,
			noClosestMatch: false,
			closestMatches: []
		};
	},
	methods: {
		onChangeText(text) {
			this.searchInput = text;
		},
		onInitSearch() {
			this.error = null;
			this.noMatch = false;
			this.noClosestMatch = false;
			this.closestMatches = [];
			this.loading = true;
		},
		async onSubmitSearchUser() {
			try {
				this.onInitSearch();
				if (!this.searchInput) throw "Please fill in a github username.";

				const response = await getUser(this.searchInput);
				if (response.message) {
					this.noMatch = true;
					this.onUserNotFoundSearchMatch();
				} else {
					this.loading = false;
					this.$router.push({
						name: "user-repos",
						params: { user: this.searchInput }
					});
				}
			} catch (e) {
				this.loading = false;
				this.error = e;
			}
		},
		async onUserNotFoundSearchMatch() {
			try {
				const response = await getUserClosestMatch(this.searchInput);

				if (!Boolean(response.total_count)) {
					this.loading = false;
					this.noClosestMatch = true;
					throw "We didn't find anything.";
				} else {
					this.loading = false;
					this.closestMatches = response.items;
				}
			} catch (e) {
				this.loading = false;
				this.error = e;
			}
		}
	}
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
