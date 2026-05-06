<template>
  <div class="max-w-3xl mx-auto">
    <button @click="$router.back()" class="mb-6 flex items-center gap-2 text-blue-600 hover:underline">
      ← Quay lại
    </button>

    <!-- Loading -->
    <div v-if="loading" class="flex flex-col gap-4 animate-pulse">
      <div class="w-full aspect-video bg-gray-200 dark:bg-gray-700 rounded-3xl"></div>
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
      <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
    </div>

    <!-- Lỗi -->
    <div v-else-if="error" class="text-center py-20 text-red-500">
      {{ error }}
    </div>

    <!-- Nội dung -->
    <div v-else-if="article._id" class="relative">
      <!-- Progress bar -->
      <div class="h-1 bg-gray-200 dark:bg-gray-700 fixed top-0 left-0 right-0 z-50">
        <div class="h-1 bg-blue-600 transition-all" :style="{ width: progress + '%' }"></div>
      </div>

      <img :src="article.image" class="w-full rounded-3xl aspect-video object-cover mb-8" />

      <span class="text-xs font-medium text-blue-600">{{ article.category }}</span>
      <h1 class="text-4xl font-bold leading-tight mt-3">{{ article.title }}</h1>
      <p class="text-sm text-gray-500 mt-4">
        {{ formatDate(article.date) }} • {{ article.author }}
      </p>

      <div class="mt-10 text-lg leading-relaxed prose max-w-none" v-html="article.content"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { newsApi } from '../api/newsApi'

const route = useRoute()
const article = ref({})
const loading = ref(true)
const error = ref('')
const progress = ref(0)

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

watch(article, (val) => {
  if (val._id) {
    useHead({
      title: val.title + ' | NEWS 2026',
      meta: [
        { name: 'description', content: val.summary },
        { property: 'og:title', content: val.title },
        { property: 'og:description', content: val.summary },
        { property: 'og:image', content: val.image },
        { property: 'og:type', content: 'article' },
      ]
    })
  }
})

const handleScroll = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  progress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
}

onMounted(async () => {
  try {
    const res = await newsApi.getById(route.params.id)
    article.value = res.data
  } catch (err) {
    error.value = 'Không tìm thấy bài viết'
  } finally {
    loading.value = false
  }
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>