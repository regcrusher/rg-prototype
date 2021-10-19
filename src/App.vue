<template>
  <div id="app" class="lg:container container-xl">
    <MoviesHome msg="New York Times Movie Reviews" />
  </div>
</template>

<script>
import MoviesHome from "./components/MoviesHome.vue";

export default {
  name: "App",
  components: {
    MoviesHome,
  },
};
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-family: "Overpass", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333333;
}
</style>
