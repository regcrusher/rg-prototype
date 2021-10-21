<template>
  <div class="hello">
    <h1 class="text-center text-4xl">{{ msg }}</h1>

    <MovieSearch @searchMovies="searchMovies($event)" />

    <div v-if="movies === null">No movies found</div>

    <div class="text-center pager mx-auto my-5">
      <button
        :class="{ invisible: pageIndex <= 0 }"
        :disabled="pageIndex <= 0"
        @click="goToPrevPage($event)"
      >
        &lt; Prev
      </button>
      <span class="mx-10"> Page {{ pageIndexForDisplay }}</span>
      <button
        :class="{ invisible: !hasMore }"
        :disabled="!hasMore"
        @click="goToNextPage($event)"
      >
        Next &gt;
      </button>
    </div>

    <Spinner v-if="loading" />

    <div v-if="movies && !loading">
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
import Spinner from "./Spinner";

const axios = require("axios");
const moviesPerPage = 20;

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
      loading: true,
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
  components: { Movie, MovieSearch, Spinner },
  methods: {
    async searchMovies(searchTerm, offset = 0, pageIndex = 0) {
      try {
        this.loading = true;
        const resp = await axios
          .get("https://api.nytimes.com/svc/movies/v2/reviews/search.json", {
            params: {
              "api-key": process.env.VUE_APP_NYT_API_KEY,
              query: searchTerm,
              offset,
            },
          })
          .finally(() => {
            this.loading = false;
          });

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
      this.loading = true;
      let newIndex = this.pageIndex + 1;
      this.searchMovies(this.searchTerm, moviesPerPage * newIndex, newIndex);
    },
    goToPrevPage() {
      this.loading = true;
      let newIndex = this.pageIndex - 1;
      this.searchMovies(this.searchTerm, moviesPerPage * newIndex, newIndex);
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
