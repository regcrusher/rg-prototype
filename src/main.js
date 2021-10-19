import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import "./index.css";

Vue.config.productionTip = false;

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    movies: {},
  },
  getters: {
    movieResults: (state) => {
      return state.movies;
    },
  },
  mutations: {
    updateMovieResults(state, movies) {
      state.movies = movies;
    },
  },
});

new Vue({
  el: "#app",
  render: (h) => h(App),
  store,
});
