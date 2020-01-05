<template>
	<p class="text-center font-weight-bold h3">{{ display }}</p>
</template>

<script>
export default {
	name: "Loader",
	props: {
		text: String,
		intervalSpeed: {
			type: Number,
			default: 500
		}
	},
	created() {
		this.interval = window.setInterval(() => {
			this.display === `${this.text}...`
				? (this.display = this.text)
				: (this.display += ".");
		}, this.intervalSpeed);
	},
	destroyed() {
		window.clearInterval(this.interval);
	},
	data() {
		return {
			display: this.text,
			interval: () => null
		};
	}
};
</script>

<style></style>
