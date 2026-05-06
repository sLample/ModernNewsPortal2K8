<template>
  <header class="border-b bg-background sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <router-link to="/" class="text-4xl font-bold tracking-tighter">NEWS</router-link>
        <span class="px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded-full">2026</span>
      </div>

      <nav class="hidden md:flex items-center gap-8 text-sm font-medium">
        <router-link to="/" class="hover:text-blue-600 transition">Trang chủ</router-link>
        <a href="#" class="hover:text-blue-600 transition">Công nghệ</a>
        <a href="#" class="hover:text-blue-600 transition">Kinh tế</a>
        <a href="#" class="hover:text-blue-600 transition">Thế giới</a>
      </nav>

      <div class="flex items-center gap-4">
        <button @click="toggleDark" class="text-2xl hover:scale-110 transition">🌙</button>

        <!-- Chưa đăng nhập -->
        <router-link
          v-if="!authStore.isLoggedIn"
          to="/login"
          class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-2xl hover:bg-blue-700 transition"
        >
          Đăng nhập
        </router-link>

        <!-- Đã đăng nhập -->
        <div v-else class="flex items-center gap-3">
          <router-link
            v-if="authStore.isAdmin"
            to="/admin"
            class="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-sm font-medium rounded-2xl hover:bg-gray-200 transition"
          >
            Admin
          </router-link>
          <span class="text-sm font-medium">{{ authStore.user?.username }}</span>
          <button
            @click="handleLogout"
            class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-2xl hover:border-red-500 hover:text-red-500 transition"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const toggleDark = () => {
  const isDark = document.documentElement.classList.toggle('dark')
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
}

const savedTheme = localStorage.getItem('theme')
if (savedTheme === 'dark') document.documentElement.classList.add('dark')

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>