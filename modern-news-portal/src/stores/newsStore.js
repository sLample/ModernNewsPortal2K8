import { defineStore } from 'pinia'

export const useNewsStore = defineStore('news', {
  state: () => ({
    newsList: [],
    filteredNews: [],
    loading: false,
    searchTerm: '',
    selectedCategory: 'all',
    page: 1,
    hasMore: true
  }),

  actions: {
    fetchNews() {
      this.loading = true
      // Demo data lớn hơn
      this.newsList = [
        { id: 1, title: "Công nghệ AI đang thay đổi thế giới như thế nào năm 2026?", summary: "...", image: "https://picsum.photos/id/1015/800/600", category: "Công nghệ", date: "10/04/2026" },
        { id: 2, title: "Việt Nam lọt top 10 quốc gia tăng trưởng kinh tế mạnh nhất châu Á", summary: "...", image: "https://picsum.photos/id/201/800/600", category: "Kinh tế", date: "09/04/2026" },
        { id: 3, title: "iPhone 18 sẽ có thiết kế đột phá nào?", summary: "...", image: "https://picsum.photos/id/30/800/600", category: "Công nghệ", date: "08/04/2026" },
        { id: 4, title: "Bitcoin đạt mức cao kỷ lục mới", summary: "...", image: "https://picsum.photos/id/251/800/600", category: "Kinh tế", date: "07/04/2026" },
        { id: 5, title: "Chiến tranh thương mại Mỹ-Trung leo thang", summary: "...", image: "https://picsum.photos/id/180/800/600", category: "Thế giới", date: "06/04/2026" }
      ]
      this.filteredNews = [...this.newsList]
      this.loading = false
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

    loadMore() {
      // Demo infinite scroll
      this.page++
      // Thêm data giả nếu muốn
      console.log('Load more page', this.page)
    }
  }
})