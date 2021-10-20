<template>
  <div class="hello">
    <h1 class="text-center text-4xl">{{ msg }}</h1>

    <MovieSearch @searchMovies="searchMovies($event)" />

    <div v-if="movies === null">No movies found</div>

    <button :disabled="pageIndex <= 0" @click="goToPrevPage($event)">
      Prev
    </button>
    {{ pageIndexForDisplay }}
    <button :disabled="!hasMore" @click="goToNextPage($event)">
      Next
    </button>

    <div v-if="movies">
      <div class="mx-auto flex flex-wrap">
        <Movie
          v-for="movie in moviesFromStore"
          v-bind:key="movie.link.url + Math.random()"
          :movie="movie"
        />
      </div>
    </div>

    <div class="text-center text-xs">{{ copyright }}</div>
  </div>
</template>

<script>
import Movie from "./Movie";
import MovieSearch from "./MovieSearch";

const axios = require("axios");

export default {
  name: "MoviesHome",
  props: {
    msg: String,
  },
  data: function() {
    return {
      movies: {},
      copyright: "",
      hasMore: false,
    };
  },
  computed: {
    moviesFromStore() {
      return this.$store.getters.movieResults;
    },
    pageIndex() {
      return this.$store.getters.pageIndex;
    },
    pageIndexForDisplay() {
      return this.$store.getters.pageIndex + 1;
    },
    searchTerm() {
      return this.$store.getters.searchTerm;
    },
  },
  components: { Movie, MovieSearch },
  methods: {
    async searchMovies(searchTerm, offset = 0, pageIndex = 0) {
      try {
        const resp = await axios.get(
          "https://api.nytimes.com/svc/movies/v2/reviews/search.json",
          {
            params: {
              "api-key": process.env.VUE_APP_NYT_API_KEY,
              query: searchTerm,
              offset,
            },
          }
        );

        this.$store.commit("updateMovieResults", {
          results: resp.data.results,
          pageIndex: pageIndex,
          searchTerm,
        });
        this.copyright = resp.data.copyright;
        this.hasMore = resp.data.has_more;
      } catch (err) {
        console.warn(err);
      }
    },
    async getAllMovies(offset = 0) {
      try {
        const resp = await axios.get(
          "https://api.nytimes.com/svc/movies/v2/reviews/all.json",
          {
            params: {
              "api-key": process.env.VUE_APP_NYT_API_KEY,
              offset,
            },
          }
        );
        console.log(this);

        this.$store.commit("updateMovieResults", {
          results: resp.data.results,
          pageIndex: 0,
          searchTerm: "",
        });
        this.copyright = resp.data.copyright;
        this.hasMore = resp.data.has_more;
      } catch (err) {
        console.warn(err);
      }
    },
    goToNextPage() {
      let newIndex = this.pageIndex + 1;
      this.searchMovies(this.searchTerm, 20 * newIndex, newIndex);
    },
    goToPrevPage() {
      let newIndex = this.pageIndex - 1;
      this.searchMovies(this.searchTerm, 20 * newIndex, newIndex);
    },
  },
  mounted() {
    this.searchMovies("", 0);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-family: "Chivo", sans-serif;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
