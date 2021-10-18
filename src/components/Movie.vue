<template>
  <div class="w-1/4">
    <div class="card mx-2">
      <a :href="movie.link.url">
        <img class="rounded-t-lg" :src="movie.multimedia.src" alt="" />
      </a>
      <div class="pt-2 px-3">
        <a :href="movie.link.url">
          <h5 class>{{ movie.display_title }}</h5>
        </a>
        <p class="font-normal text-gray-700 mb-3">{{ movie.summary_short }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Movie",
  props: {
    movie: Object,
  },
};
</script>
