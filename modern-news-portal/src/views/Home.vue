<template>
  <div>
    <!-- Search & Filter -->
    <div class="flex flex-col md:flex-row gap-4 mb-8">
      <input 
        v-model="newsStore.searchTerm"
        @input="newsStore.filterNews"
        placeholder="Tìm kiếm tin tức..." 
        class="flex-1 px-5 py-4 border border-gray-300 dark:border-gray-700 rounded-3xl focus:outline-none focus:border-blue-500"
      >
      <select 
        v-model="newsStore.selectedCategory"
        @change="newsStore.filterNews"
        class="px-5 py-4 border border-gray-300 dark:border-gray-700 rounded-3xl focus:outline-none"
      >
        <option value="all">Tất cả</option>
        <option value="Công nghệ">Công nghệ</option>
        <option value="Kinh tế">Kinh tế</option>
        <option value="Thế giới">Thế giới</option>
      </select>
    </div>

    <h1 class="text-5xl font-bold tracking-tighter mb-10">Tin mới nhất</h1>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <NewsCard 
        v-for="item in newsStore.filteredNews" 
        :key="item.id"
        :news="item"
      />
    </div>

    <!-- Infinite scroll trigger -->
    <div v-if="newsStore.hasMore" ref="loadMoreRef" class="h-10"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useNewsStore } from '../stores/newsStore'
import NewsCard from '../components/NewsCard.vue'

const newsStore = useNewsStore()
const loadMoreRef = ref(null)

onMounted(() => {
  newsStore.fetchNews()

  // Infinite scroll
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) newsStore.loadMore()
  })
  if (loadMoreRef.value) observer.observe(loadMoreRef.value)
})
</script>