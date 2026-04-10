<template>
  <header class="border-b bg-background sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <h1 class="text-4xl font-bold tracking-tighter">NEWS</h1>
        <span class="px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded-full">2026</span>
      </div>

      <nav class="hidden md:flex items-center gap-8 text-sm font-medium">
        <a href="#" class="hover:text-blue-600 transition">Trang chủ</a>
        <a href="#" class="hover:text-blue-600 transition">Công nghệ</a>
        <a href="#" class="hover:text-blue-600 transition">Kinh tế</a>
        <a href="#" class="hover:text-blue-600 transition">Thế giới</a>
      </nav>

      <div class="flex items-center gap-4">
        <button class="text-2xl hover:scale-110 transition">🔍</button>
        <button @click="toggleDark" class="text-2xl hover:scale-110 transition">🌙</button>
      </div>
    </div>
  </header>
</template>

<script setup>
const toggleDark = () => {
  document.documentElement.classList.toggle('dark')
}
</script>