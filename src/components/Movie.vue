<template>
  <div class="sm:w-1/2 md:w-1/2 lg:w-1/3 ">
    <div class="flex flex-col card  rounded-t-lg border-2 mx-2 mb-4">
      <a :href="movie.link.url" :aria-label="movie.display_title">
        <img
          v-if="movie.multimedia"
          class="rounded-t-md w-full"
          :src="movie.multimedia.src"
          :alt="movie.display_title"
        />
        <img
          v-if="movie.multimedia === null"
          class="rounded-t-md block w-full"
          src="https://via.placeholder.com/420x280?text=FPO"
          alt="FPO"
        />
      </a>
      <div class="pt-2 px-2 pb-6">
        <div class="card__title text-xl mt-2 pb-1">
          <a
            :href="movie.link.url"
            :aria-label="movie.display_title"
            class="hover:underline"
            >{{ movie.display_title }}
          </a>
        </div>
        <p class="font-normal text-gray-700 mb-3">
          <span v-html="movie.summary_short"></span>
        </p>
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
