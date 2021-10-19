<template>
  <div class="hello">
    <h1 class="text-center text-4xl">{{ msg }}</h1>

    <MovieSearch @searchMovies="searchMovies($event)" />

    <div v-if="movies === null">No movies found</div>

    <div v-if="movies">
      <div class="mx-auto flex flex-wrap">
        <Movie
          v-for="movie in moviesFromStore"
          v-bind:key="movie.link.url"
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
    };
  },
  computed: {
    moviesFromStore() {
      return this.$store.getters.movieResults;
    },
  },
  components: { Movie, MovieSearch },
  methods: {
    async searchMovies(searchTerm) {
      try {
        const resp = await axios.get(
          "https://api.nytimes.com/svc/movies/v2/reviews/search.json",
          {
            params: {
              "api-key": process.env.VUE_APP_NYT_API_KEY,
              query: searchTerm,
            },
          }
        );

        this.$store.commit("updateMovieResults", resp.data.results);
        this.copyright = resp.data.copyright;
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
              offset: offset,
            },
          }
        );
        console.log(this);

        this.$store.commit("updateMovieResults", resp.data.results);
        this.copyright = resp.data.copyright;
      } catch (err) {
        console.warn(err);
      }
    },
  },
  mounted() {
    this.getAllMovies(0);
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
