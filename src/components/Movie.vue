<template>
  <div class="sm:w-1/2 md:w-1/2 lg:w-1/3 ">
    <div class="card  border-2 mx-2 mb-4">
      <a :href="movie.link.url" :aria-label="movie.display_title">
        <img
          v-if="movie.multimedia"
          class="rounded-t-lg motion-safe:hover:scale-110"
          :src="movie.multimedia.src"
          :alt="movie.display_title"
        />
        <img
          v-if="movie.multimedia === null"
          class="rounded-t-lg motion-safe:hover:scale-110"
          src="https://via.placeholder.com/420x280"
          alt="FPO"
        />
      </a>
      <div class="pt-2 px-2 pb-6">
        <div class="card__title text-xl mt-2 pb-1">
          <a :href="movie.link.url" :aria-label="movie.display_title"
            >{{ movie.display_title }}
          </a>
        </div>
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

<style scoped>
.card__title {
  font-family: "Chivo", sans-serif;
}
</style>
