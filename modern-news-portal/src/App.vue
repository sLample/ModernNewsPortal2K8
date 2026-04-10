<template>
  <div class="min-h-screen bg-background text-foreground">
    <Header />
    <main class="max-w-7xl mx-auto px-4 py-8">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
</script>