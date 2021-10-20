<template>
  <form class="w-full mx-auto max-w-sm my-6">
    <div class="flex items-center border-b border-teal-500 py-2">
      <input
        class="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2  focus:outline-none"
        type="text"
        v-model="searchTerm"
        placeholder="Enter your search term"
        aria-label="Movie name"
        @keyup.enter="searchMovies"
      />
      <button
        class="flex-shrink-0 bg-black-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-2 py-1 px-2 rounded"
        type="submit"
        v-on:click="searchMovies"
      >
        Search Movies
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "MovieSearch",
  data() {
    return { searchTerm: "" };
  },
  computed: {
    escapedSearchTerm: function() {
      return encodeURIComponent(this.searchTerm);
    },
  },
  methods: {
    searchMovies(e) {
      e.preventDefault();
      this.$emit("searchMovies", this.searchTerm);
    },
  },
};
</script>
