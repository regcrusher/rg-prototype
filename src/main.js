import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import "./index.css";

Vue.config.productionTip = false;

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    movies: {},
    pageIndex: 0,
    searchTerm: "",
  },
  getters: {
    movieResults: (state) => {
      return state.movies;
    },
    pageIndex: (state) => {
      return state.pageIndex;
    },
    searchTerm: (state) => {
      return state.searchTerm;
    },
  },
  mutations: {
    updateMovieResults(state, movies) {
      state.movies = movies.results;
      state.pageIndex = movies.pageIndex;
      state.searchTerm = movies.searchTerm;
    },
    increment(state) {
      state.pageIndex++;
    },
    decrement(state) {
      state.pageIndex--;
    },
  },
});

new Vue({
  el: "#app",
  render: (h) => h(App),
  store,
});
