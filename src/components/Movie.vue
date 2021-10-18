<template>
  <div class="w-1/3">
    <a :href="movie.link.url">
        <img class="rounded-t-lg" :src="movie.multimedia.src" alt="" />
    </a>
    <div class="p-5">
        <a :href="movie.link.url">
            <h5 class>{{movie.display_title}}</h5>
        </a>
        <p class="font-normal text-gray-700 mb-3">{{movie.summary_short}}</p>
    </div>
</div>
</template>

<script>

export default {
  name: "Movie",
  props: {
    movie: Object
  },
};
</script>
