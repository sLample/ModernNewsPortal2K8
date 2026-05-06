import { defineStore } from 'pinia'
import { newsApi } from '../api/newsApi'

export const useNewsStore = defineStore('news', {
  state: () => ({
    newsList: [],
    filteredNews: [],
    loading: false,
    error: null,
    searchTerm: '',
    selectedCategory: 'all',
  }),

  actions: {
    async fetchNews() {
      this.loading = true
      this.error = null
      try {
        const res = await newsApi.getAll()
        this.newsList = res.data
        this.filteredNews = res.data
      } catch (err) {
        this.error = 'Không thể tải tin tức'
        console.error(err)
      } finally {
        this.loading = false
      }
    },

    filterNews() {
      let result = this.newsList
      if (this.searchTerm) {
        const term = this.searchTerm.toLowerCase()
        result = result.filter(n =>
          n.title.toLowerCase().includes(term) ||
          n.summary.toLowerCase().includes(term)
        )
      }
      if (this.selectedCategory !== 'all') {
        result = result.filter(n => n.category === this.selectedCategory)
      }
      this.filteredNews = result
    },
  }
})