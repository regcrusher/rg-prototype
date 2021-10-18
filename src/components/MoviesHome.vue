<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div v-if="movies === null">
      No movies found
    </div>

    <div v-if="movies">
      <div class="mx-auto flex flex-wrap">
        <Movie
          v-for="movie in movies"
          v-bind:key="movie.link.url"
          :movie="movie"
        >
        </Movie>
      </div>
    </div>
  </div>
</template>

<script>
import Movie from "./Movie";

const axios = require("axios");

export default {
  name: "MoviesHome",
  props: {
    msg: String,
  },
  data: function() {
    return { movies: {} };
  },
  components: { Movie },
  mounted() {
    // console.log(process.env)
    axios
      .get("https://api.nytimes.com/svc/movies/v2/reviews/all.json", {
        params: {
          "api-key": process.env.VUE_APP_NYT_API_KEY,
        },
      })
      .then((response) => {
        // handle success
        this.movies = response.data.results;
        console.log(response.data.results);
      })
      .catch((response) => {
        // handle error
        console.log(response);
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
