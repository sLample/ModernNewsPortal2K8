<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="w-full max-w-md p-8 border border-gray-200 dark:border-gray-700 rounded-3xl">
      
      <!-- Tab switch -->
      <div class="flex mb-8 border border-gray-200 dark:border-gray-700 rounded-2xl p-1">
        <button 
          @click="mode = 'login'"
          :class="mode === 'login' ? 'bg-blue-600 text-white' : 'text-gray-500'"
          class="flex-1 py-2 rounded-xl text-sm font-medium transition"
        >
          Đăng nhập
        </button>
        <button 
          @click="mode = 'register'"
          :class="mode === 'register' ? 'bg-blue-600 text-white' : 'text-gray-500'"
          class="flex-1 py-2 rounded-xl text-sm font-medium transition"
        >
          Đăng ký
        </button>
      </div>

      <!-- Form đăng nhập -->
      <form v-if="mode === 'login'" @submit.prevent="handleLogin" class="flex flex-col gap-4">
        <h2 class="text-2xl font-bold mb-2">Chào mừng trở lại</h2>

        <input
          v-model="loginForm.email"
          type="email"
          placeholder="Email"
          class="px-5 py-4 border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-blue-500 bg-transparent"
          required
        />
        <input
          v-model="loginForm.password"
          type="password"
          placeholder="Mật khẩu"
          class="px-5 py-4 border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-blue-500 bg-transparent"
          required
        />

        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

        <button
          type="submit"
          :disabled="loading"
          class="py-4 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {{ loading ? 'Đang đăng nhập...' : 'Đăng nhập' }}
        </button>
      </form>

      <!-- Form đăng ký -->
      <form v-if="mode === 'register'" @submit.prevent="handleRegister" class="flex flex-col gap-4">
        <h2 class="text-2xl font-bold mb-2">Tạo tài khoản</h2>

        <input
          v-model="registerForm.username"
          type="text"
          placeholder="Tên đăng nhập (tối thiểu 3 ký tự)"
          class="px-5 py-4 border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-blue-500 bg-transparent"
          required
        />
        <input
          v-model="registerForm.email"
          type="email"
          placeholder="Email"
          class="px-5 py-4 border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-blue-500 bg-transparent"
          required
        />
        <input
          v-model="registerForm.password"
          type="password"
          placeholder="Mật khẩu (tối thiểu 6 ký tự)"
          class="px-5 py-4 border border-gray-300 dark:border-gray-700 rounded-2xl focus:outline-none focus:border-blue-500 bg-transparent"
          required
        />

        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
        <p v-if="success" class="text-green-500 text-sm">{{ success }}</p>

        <button
          type="submit"
          :disabled="loading"
          class="py-4 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {{ loading ? 'Đang đăng ký...' : 'Đăng ký' }}
        </button>
      </form>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import { authApi } from '../api/authApi'

const router = useRouter()
const authStore = useAuthStore()

const mode = ref('login')
const loading = ref(false)
const error = ref('')
const success = ref('')

const loginForm = ref({ email: '', password: '' })
const registerForm = ref({ username: '', email: '', password: '' })

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  try {
    await authStore.login(loginForm.value.email, loginForm.value.password)
    router.push('/')
  } catch (err) {
    error.value = err.response?.data?.message || 'Email hoặc mật khẩu sai'
  } finally {
    loading.value = false
  }
}

const handleRegister = async () => {
  loading.value = true
  error.value = ''
  success.value = ''
  try {
    await authApi.register(registerForm.value)
    success.value = 'Đăng ký thành công! Hãy đăng nhập.'
    mode.value = 'login'
  } catch (err) {
    error.value = err.response?.data?.error || 'Đăng ký thất bại'
  } finally {
    loading.value = false
  }
}
</script>