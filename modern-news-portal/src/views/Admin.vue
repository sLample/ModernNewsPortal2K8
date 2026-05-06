<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold">Admin Dashboard</h1>
      <button @click="showForm = true" class="px-6 py-3 bg-blue-600 text-white rounded-2xl font-medium hover:bg-blue-700 transition">
        + Tạo bài viết
      </button>
    </div>

    <div v-if="showForm" class="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <h2 class="text-2xl font-bold mb-6 text-gray-900">{{ editingId ? 'Sửa bài viết' : 'Tạo bài viết mới' }}</h2>
        <div class="flex flex-col gap-4">
          <input v-model="form.title" placeholder="Tiêu đề" class="px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 bg-white text-gray-900" />
          <input v-model="form.summary" placeholder="Tóm tắt" class="px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 bg-white text-gray-900" />
          <RichEditor v-model="form.content" />
          <select v-model="form.category" class="px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none bg-white text-gray-900">
            <option value="">Chọn danh mục</option>
            <option value="Công nghệ">Công nghệ</option>
            <option value="Kinh tế">Kinh tế</option>
            <option value="Thế giới">Thế giới</option>
            <option value="Thể thao">Thể thao</option>
            <option value="Giải trí">Giải trí</option>
          </select>

          <div class="flex flex-col gap-2">
            <label class="text-sm font-medium text-gray-600">Ảnh bìa</label>
            <div class="flex border border-gray-200 rounded-2xl p-1 bg-gray-50">
              <button type="button" @click="imageMode = 'file'" :class="imageMode === 'file' ? 'bg-white shadow text-blue-600' : 'text-gray-500'" class="flex-1 py-2 rounded-xl text-sm font-medium transition">
                📁 Tải file lên
              </button>
              <button type="button" @click="imageMode = 'url'" :class="imageMode === 'url' ? 'bg-white shadow text-blue-600' : 'text-gray-500'" class="flex-1 py-2 rounded-xl text-sm font-medium transition">
                🔗 Dán link ảnh
              </button>
            </div>
            <div v-if="imageMode === 'file'">
              <div v-if="uploadLoading" class="px-5 py-4 border border-gray-300 rounded-2xl text-gray-500 text-sm">Đang upload ảnh...</div>
              <input v-else type="file" accept="image/*" @change="handleImageUpload" class="px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none bg-white text-gray-900 w-full" />
            </div>
            <div v-if="imageMode === 'url'" class="flex gap-2">
              <input v-model="imageUrlInput" placeholder="https://example.com/image.jpg" class="flex-1 px-5 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 bg-white text-gray-900" />
              <button type="button" @click="handleImageUrl" class="px-5 py-4 bg-blue-600 text-white rounded-2xl font-medium hover:bg-blue-700 transition">Xác nhận</button>
            </div>
            <div v-if="imagePreview" class="mt-2">
              <img :src="imagePreview" class="w-full aspect-video object-cover rounded-2xl" />
              <p class="text-xs text-green-600 mt-1">✓ Ảnh đã sẵn sàng</p>
            </div>
          </div>

          <p v-if="formError" class="text-red-500 text-sm">{{ formError }}</p>
          <p v-if="formSuccess" class="text-green-500 text-sm">{{ formSuccess }}</p>

          <div class="flex gap-3 mt-2">
            <button @click="handleSubmit" :disabled="formLoading || uploadLoading" class="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition disabled:opacity-50">
              {{ formLoading ? 'Đang lưu...' : editingId ? 'Cập nhật' : 'Đăng bài' }}
            </button>
            <button @click="closeForm" class="flex-1 py-4 border border-gray-300 text-gray-700 rounded-2xl font-semibold hover:border-red-500 hover:text-red-500 transition">Hủy</button>
          </div>
        </div>
      </div>
    </div>

    <div class="border border-gray-200 rounded-3xl overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="text-left px-6 py-4 text-sm font-semibold text-gray-600">Bài viết</th>
            <th class="text-left px-6 py-4 text-sm font-semibold text-gray-600">Danh mục</th>
            <th class="text-left px-6 py-4 text-sm font-semibold text-gray-600">Ngày</th>
            <th class="text-left px-6 py-4 text-sm font-semibold text-gray-600">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in newsList" :key="item._id" class="border-t border-gray-200 hover:bg-gray-50 transition">
            <td class="px-6 py-4">
              <div class="flex items-center gap-4">
                <img :src="item.image" class="w-16 h-12 object-cover rounded-xl" />
                <span class="font-medium line-clamp-2 max-w-xs text-gray-900">{{ item.title }}</span>
              </div>
            </td>
            <td class="px-6 py-4"><span class="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">{{ item.category }}</span></td>
            <td class="px-6 py-4 text-sm text-gray-500">{{ new Date(item.date).toLocaleDateString('vi-VN') }}</td>
            <td class="px-6 py-4">
              <div class="flex gap-2">
                <button @click="handleEdit(item)" class="px-4 py-2 text-sm border border-gray-300 rounded-xl hover:border-blue-500 hover:text-blue-500 transition">Sửa</button>
                <button @click="handleDelete(item._id)" class="px-4 py-2 text-sm border border-gray-300 rounded-xl hover:border-red-500 hover:text-red-500 transition">Xóa</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="newsList.length === 0" class="text-center py-20 text-gray-500">Chưa có bài viết nào</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { newsApi } from '../api/newsApi'
import RichEditor from '../components/RichEditor.vue'

const newsList = ref([])
const showForm = ref(false)
const editingId = ref(null)
const formLoading = ref(false)
const uploadLoading = ref(false)
const formError = ref('')
const formSuccess = ref('')
const imagePreview = ref('')
const imageMode = ref('file')
const imageUrlInput = ref('')

const form = ref({ title: '', summary: '', content: '', category: '', image: '', author: 'Admin' })

const fetchNews = async () => {
  const res = await newsApi.getAll()
  newsList.value = res.data
}

const handleImageUpload = async (e) => {
  const file = e.target.files[0]
  if (!file) return
  imagePreview.value = URL.createObjectURL(file)
  uploadLoading.value = true
  formError.value = ''
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'news_portal')
  try {
    const res = await fetch('https://api.cloudinary.com/v1_1/dwnyvcrmj/image/upload', { method: 'POST', body: formData })
    const data = await res.json()
    form.value.image = data.secure_url
    imagePreview.value = data.secure_url
  } catch (err) {
    formError.value = 'Upload ảnh thất bại'
    imagePreview.value = ''
  } finally {
    uploadLoading.value = false
  }
}

const handleImageUrl = () => {
  if (!imageUrlInput.value) return
  form.value.image = imageUrlInput.value
  imagePreview.value = imageUrlInput.value
}

const handleSubmit = async () => {
  if (!form.value.title || !form.value.summary || !form.value.content || !form.value.category) {
    formError.value = 'Vui lòng điền đầy đủ thông tin'
    return
  }
  formLoading.value = true
  formError.value = ''
  formSuccess.value = ''
  try {
    if (editingId.value) {
      await newsApi.update(editingId.value, form.value)
      formSuccess.value = 'Cập nhật thành công!'
    } else {
      await newsApi.create(form.value)
      formSuccess.value = 'Đăng bài thành công!'
    }
    await fetchNews()
    setTimeout(() => closeForm(), 1000)
  } catch (err) {
    formError.value = err.response?.data?.message || 'Có lỗi xảy ra'
  } finally {
    formLoading.value = false
  }
}

const handleEdit = (item) => {
  editingId.value = item._id
  form.value = { title: item.title, summary: item.summary, content: item.content, category: item.category, image: item.image, author: item.author }
  imagePreview.value = item.image
  imageMode.value = 'file'
  imageUrlInput.value = ''
  showForm.value = true
}

const handleDelete = async (id) => {
  if (!confirm('Bạn có chắc muốn xóa bài viết này?')) return
  try {
    await newsApi.delete(id)
    await fetchNews()
  } catch (err) {
    alert('Xóa thất bại')
  }
}

const closeForm = () => {
  showForm.value = false
  editingId.value = null
  imagePreview.value = ''
  imageMode.value = 'file'
  imageUrlInput.value = ''
  formError.value = ''
  formSuccess.value = ''
  form.value = { title: '', summary: '', content: '', category: '', image: '', author: 'Admin' }
}

onMounted(fetchNews)
</script>