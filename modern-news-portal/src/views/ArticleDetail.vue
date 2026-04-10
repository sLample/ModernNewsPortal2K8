<template>
  <div class="max-w-3xl mx-auto">
    <button @click="$router.back()" class="mb-6 flex items-center gap-2 text-blue-600 hover:underline">
      ← Quay lại
    </button>

    <div class="relative">
      <!-- Progress bar -->
      <div class="h-1 bg-gray-200 dark:bg-gray-700 fixed top-0 left-0 right-0 z-50">
        <div class="h-1 bg-blue-600 transition-all" :style="{ width: progress + '%' }"></div>
      </div>

      <img :src="article.image" class="w-full rounded-3xl aspect-video object-cover mb-8" />
      
      <span class="text-xs font-medium text-blue-600">{{ article.category }}</span>
      <h1 class="text-4xl font-bold leading-tight mt-3">{{ article.title }}</h1>
      <p class="text-sm text-gray-500 mt-4">{{ article.date }} • 8 phút đọc</p>

      <div class="prose dark:prose-invert mt-10 text-lg leading-relaxed">
        <p>{{ article.content || 'Nội dung bài viết chi tiết sẽ được lấy từ API. Đây là demo.' }}</p>
        <p>Đây là phần nội dung mẫu. Bạn có thể thay bằng rich text sau này (tiptap hoặc markdown).</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useNewsStore } from '../stores/newsStore'

const route = useRoute()
const newsStore = useNewsStore()
const article = ref({})
const progress = ref(0)

const handleScroll = () => {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  progress.value = (scrollTop / docHeight) * 100
}

onMounted(() => {
  const found = newsStore.newsList.find(n => n.id === parseInt(route.params.id))
  if (found) article.value = found
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>