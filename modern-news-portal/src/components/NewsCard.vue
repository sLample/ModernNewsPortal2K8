<template>
  <div @click="goToDetail" class="group cursor-pointer">
    <div class="overflow-hidden rounded-3xl mb-4 aspect-video">
      <img :src="news.image" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
    </div>
    <span class="text-xs font-medium text-blue-600">{{ news.category }}</span>
    <h3 class="text-xl font-semibold mt-2 leading-tight group-hover:text-blue-600 transition">{{ news.title }}</h3>
    <p class="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">{{ news.summary }}</p>
    <p class="text-xs text-gray-500 mt-4">{{ news.date }}</p>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
defineProps({ news: Object })

const router = useRouter()
const goToDetail = () => {
  router.push(`/article/${props.news.id}`)
}
</script>