<template>
  <div>
    <!-- Search & Filter -->
    <div class="flex flex-col md:flex-row gap-4 mb-8">
      <input
        v-model="newsStore.searchTerm"
        @input="newsStore.filterNews"
        placeholder="Tìm kiếm tin tức..."
        class="flex-1 px-5 py-4 border border-gray-300 dark:border-gray-700 rounded-3xl focus:outline-none focus:border-blue-500 bg-transparent"
      />
      <select
        v-model="newsStore.selectedCategory"
        @change="newsStore.filterNews"
        class="px-5 py-4 border border-gray-300 dark:border-gray-700 rounded-3xl focus:outline-none bg-transparent"
      >
        <option value="all">Tất cả</option>
        <option value="Công nghệ">Công nghệ</option>
        <option value="Kinh tế">Kinh tế</option>
        <option value="Thế giới">Thế giới</option>
      </select>
    </div>

    <h1 class="text-5xl font-bold tracking-tighter mb-10">Tin mới nhất</h1>

    <!-- Skeleton loading -->
    <div v-if="newsStore.loading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="n in 6" :key="n" class="animate-pulse">
        <div class="w-full aspect-video bg-gray-200 dark:bg-gray-700 rounded-3xl mb-4"></div>
        <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-3"></div>
        <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
        <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
      </div>
    </div>

    <!-- Lỗi -->
    <div v-else-if="newsStore.error" class="text-center py-20 text-red-500">
      {{ newsStore.error }}
    </div>

    <!-- Không có kết quả -->
    <div v-else-if="newsStore.filteredNews.length === 0" class="text-center py-20 text-gray-500">
      Không tìm thấy tin tức nào
    </div>

    <!-- Danh sách tin -->
    <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      <NewsCard
        v-for="item in newsStore.filteredNews"
        :key="item._id"
        :news="item"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useNewsStore } from '../stores/newsStore'
import NewsCard from '../components/NewsCard.vue'

const newsStore = useNewsStore()

onMounted(() => {
  newsStore.fetchNews()
})
</script>