<template>
  <div>
    <input v-model="searchTerm" placeholder="Enter your search term" />  <button v-on:click="searchMovies">Search Movies</button>
    <p>Search Term: {{ escapedSearchTerm }}</p>
  </div>
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
    searchMovies() {
      this.$emit("searchMovies", this.searchTerm);
    },
  },
};
</script>
